import { Injectable } from '@angular/core';
import { IHero } from './hero';
import { EquipmentService } from '../equipment/equipment.service';
import { StorageService } from '../storage/storage.service';
import { CashService } from '../cash/cash.service';

@Injectable()
export class HeroService {

    hero: IHero;
    intervalId: number;

    constructor(private _storageService: StorageService, private _equipmentService: EquipmentService,
        private _cashService: CashService) {
        if (this._storageService.retrieve("hero")) {
            this.hero = this._storageService.retrieve("hero");
        }
        else {
            this.hero = { name: "Rob", job: "Demi-Druid", power: 1, criticalChance: 0.04, criticalPower: 5, fame: 0, isAutoAdventuring: false };
        }

        this._storageService.autoSaveNotification.subscribe((dummy) => {
            this._storageService.store("hero", this.hero);
        });

        if (this.hero.isAutoAdventuring) {
            this.beginAutoAdventure();
        }

        this.recalculatePower();
    }

    getHero(): IHero {
        return this.hero;
    }

    recalculatePower() {
        this.hero.power = this._equipmentService.calculatePower();
    }

    addKarma(fame: number) {
        this.hero.fame += fame;
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
}
