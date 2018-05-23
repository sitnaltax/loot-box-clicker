import { Injectable } from '@angular/core';
import { IHero } from './hero';
import { EquipmentService } from '../equipment/equipment.service';
import { StorageService } from '../storage/storage.service';
import { CashService } from '../cash/cash.service';
import { TrainerService } from '../trainer/trainer.service';
import { ISkill, skillId } from '../trainer/skill';

@Injectable()
export class HeroService {

    hero: IHero;
    intervalId: number;

    constructor(private _storageService: StorageService, private _equipmentService: EquipmentService,
        private _cashService: CashService, private _trainerService: TrainerService) {
        if (this._storageService.retrieve("hero")) {
            this.hero = this._storageService.retrieve("hero");
        }
        else {
            this.hero = { name: "Nameless Adventurer", job: "Demi-Druid", power: 1, criticalChance: 0.04, criticalPower: 5, fame: 0, isAutoAdventuring: false, gender: "" };
        }

        this._storageService.autoSaveNotification.subscribe((dummy) => {
            this._storageService.store("hero", this.hero);
        });

        this._storageService.resetNotification.subscribe((dummy) => {
            this.hero = { name: "Nameless Adventurer", job: "Demi-Druid", power: 1, criticalChance: 0.04, criticalPower: 5, fame: 0, isAutoAdventuring: false, gender: "" };
        });

        if (this.hero.isAutoAdventuring) {
            this.beginAutoAdventure();
        }

        this.recalculatePower();
    }

    getHero(): IHero {
        return this.hero;
    }

    criticalPowerPerRank: number = 1 / 15;    //every 15 ranks gives you +1 critical hit power, starting at x5
    criticalChancePerRank: number = (0.01 / 15);   //every 15 ranks gives you 1% critical hit rate, which can explode,
    //starting at 4%

    recalculatePower() {
        this.hero.power = this._equipmentService.calculatePower();
        this.hero.criticalChance = 0.04 + (this._trainerService.getRanksForSkillById(skillId.critChance) *
            this.criticalChancePerRank);
        this.hero.criticalPower = 5 + (this._trainerService.getRanksForSkillById(skillId.critPower) *
            this.criticalPowerPerRank)

    }

    addKarma(fame: number) {
        this.hero.fame += fame;
    }

    purchaseTraining(skill: ISkill) {
        let cost: number = this._trainerService.getCostForSkill(skill);
        if (cost > this.hero.fame) {
            return;
        }
        else {
            this.hero.fame -= cost;
            this._trainerService.incrementSkill(skill);
            this.recalculatePower();
        }
    }

    toggleAutoAdventure() {
        this.hero.isAutoAdventuring = !this.hero.isAutoAdventuring;
        if (this.hero.isAutoAdventuring) {
            this.beginAutoAdventure();
        }
        else {
            window.clearInterval(this.intervalId);
        }
    }

    beginAutoAdventure() {
        window.clearInterval(this.intervalId);
        this.intervalId = window.setInterval(() => {
            this.adventure();
        }
            , 1000);
    }

    adventure() {
        this._cashService.adventure(this.hero);
    }

    saveVanityOptions(name: string, job: string, gender: string) {
        this.hero.name = name;
        this.hero.job = job;
        this.hero.gender = gender;
    }
}
