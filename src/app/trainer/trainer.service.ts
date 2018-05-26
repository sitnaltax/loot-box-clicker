import { Injectable } from '@angular/core';
import { ISkill, skillId } from './skill';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class TrainerService {

    playerSkillList: number[]; //index is skillId, value is ranks
    constructor(private _storageService: StorageService) {
        if (this._storageService.retrieve("skills")) {
            this.playerSkillList = this._storageService.retrieve("skills");
            while (this.playerSkillList.length < this.getSkills().length) {
                this.playerSkillList.push(0);
            }
        }
        else {
            this.playerSkillList = [];
            this.getSkills().forEach(() => {this.playerSkillList.push(0);});
        }

        this._storageService.autoSaveNotification.subscribe((dummy) => {
            this._storageService.store("skills", this.playerSkillList);
        });

        this._storageService.resetNotification.subscribe((dummy) => {
            this.playerSkillList = [];
            this.getSkills().forEach(() => {this.playerSkillList.push(0);});
        });
    }

    getSkills(): ISkill[] {
        return [{ skillId: skillId.critChance, name: "Critical Chance", baseCost: 100, scalingFactor: 1.15, helpText: "Grants a chance to gain extra treasure on each adventure. Chance is 4% + 1% per 15 ranks." },
        { skillId: skillId.critPower, name: "Critical Power", baseCost: 100, scalingFactor: 1.15, helpText: "Increases the amount of extra treasure on a critical success. Multiplier is 5x, + 1x per 15 ranks."},
        { skillId: skillId.autoDonate, name: "Auto-Donate", baseCost: 1000, scalingFactor: 2, helpText: "Gives you a chance to automatically donate items that are worse than your currently equipped item. 1/4 chance (independent) per rank." },
        { skillId: skillId.multiBuy, name: "Multi-Buy", baseCost: 500, scalingFactor: 5, helpText: "When you buy a chest, you buy 5 times more for every rank in Multi-Buy (up to what you can afford)." }
    ];
    }

    getCostForSkill(skill: ISkill): number {
        return Math.round(skill.baseCost * Math.pow(skill.scalingFactor, this.playerSkillList[skill.skillId]));
    }

    getRanksForSkill(skill: ISkill): number {
        return this.playerSkillList[skill.skillId];
    }

    getRanksForSkillById(skillId: skillId): number {
        return this.playerSkillList[skillId];
    }

    incrementSkill(skill: ISkill) {
        this.playerSkillList[skill.skillId] += 1;
    }
}
