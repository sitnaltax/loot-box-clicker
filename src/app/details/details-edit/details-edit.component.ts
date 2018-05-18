import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../hero/hero.service';
import { IHero } from '../../hero/hero';

@Component({
    selector: 'details-edit',
    templateUrl: './details-edit.component.html',
    styleUrls: ['./details-edit.component.css']
})
export class DetailsEditComponent implements OnInit {

    possibleJobs: string[] = ["Fighter", "Lover", "Lover/Rogue", "Demi-Druid", "Troubadour", "Calculator", "Anti-Rogue", 
    "Hedge Rogue", "Witch Rogue", "Rouge", "Murder Hobo", "Diplomacy Hobo"];

    modelHero: IHero;
    constructor(private _heroService: HeroService) { }

    ngOnInit() {
        this.modelHero = this._heroService.getHero();
    }

    saveHero() {
        this._heroService.saveVanityOptions(this.modelHero.name, this.modelHero.job, this.modelHero.gender);
    }

}
