import { Component, OnInit } from '@angular/core';
import { TrainerService } from './trainer.service';
import { ISkill } from './skill';
import { HeroService } from '../hero/hero.service';
import { CashService } from '../cash/cash.service';

@Component({
    selector: 'trainer-display',
    templateUrl: './trainer-display.component.html',
    styleUrls: ['./trainer-display.component.css']
})
export class TrainerDisplayComponent implements OnInit {

    allSkills: ISkill[];
    allCosts: number[];
    allRanks: number[];
    constructor(private _trainerService: TrainerService, private _heroService: HeroService, private _cashService: CashService) {
        this.allSkills = this._trainerService.getSkills();
        this.updateCostsAndRanks();
    }

    updateCostsAndRanks() {
        this.allCosts = [];
        this.allRanks = [];
        this.allSkills.forEach((skill) => {
            this.allCosts.push(this.getCostForSkill[skill.skillId]);
            this.allRanks.push(this.getRanksForSkill[skill.skillId]);
        });
    }

    getCostForSkill(skill: ISkill): number {
        return this._trainerService.getCostForSkill(skill);
    }

    getRanksForSkill(skill: ISkill): number {
        return this._trainerService.getRanksForSkill(skill);
    }

    purchase(skill: ISkill) {
        this._heroService.purchaseTraining(skill);
    }

    donateCash() {
        this._heroService.donateCash();
    }

    ngOnInit() {
    }

}
