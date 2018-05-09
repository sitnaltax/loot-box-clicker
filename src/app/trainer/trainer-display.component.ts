import { Component, OnInit } from '@angular/core';
import { TrainerService } from './trainer.service';
import { ISkill } from './skill';

@Component({
    selector: 'trainer-display',
    templateUrl: './trainer-display.component.html',
    styleUrls: ['./trainer-display.component.css']
})
export class TrainerDisplayComponent implements OnInit {

    constructor(private _trainerService: TrainerService) { }

    getSkills(): ISkill[] {
        return this._trainerService.getSkills();
    }

    getCostForSkill(skill: ISkill) : number {
        return this._trainerService.getCostForSkill(skill);
    }

    getRanksForSkill(skill: ISkill) : number {
        return this._trainerService.getRanksForSkill(skill);        
    }

    purchase(skill: ISkill){
        this._trainerService.purchase(skill);
    }

    ngOnInit() {
    }

}
