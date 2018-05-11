import { Injectable } from '@angular/core';
import { ISkill, skillId } from './skill';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class TrainerService {

    playerSkillList: number[]; //index is skillId, value is ranks
    constructor(private _storageService: StorageService) {
        if (this._storageService.retrieve("skills")) {
            this.playerSkillList = this._storageService.retrieve("skills");
        }
        else {
            this.playerSkillList = [];
            this.getSkills().forEach(() => {this.playerSkillList.push(0);});
        }

        this._storageService.autoSaveNotification.subscribe((dummy) => {
            this._storageService.store("skills", this.playerSkillList);
        });
    }

    getSkills(): ISkill[] {
        return [{ skillId: skillId.critChance, name: "Critical Chance", baseCost: 100, scalingFactor: 1.15 },
        { skillId: skillId.critPower, name: "Critical Power", baseCost: 100, scalingFactor: 1.15 },
        { skillId: skillId.autoDonate, name: "Auto-Donate", baseCost: 1000, scalingFactor: 2 },];
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
