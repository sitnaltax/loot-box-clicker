import { Component, OnInit } from '@angular/core';
import { IHero } from './hero';
import { HeroService } from './hero.service';
import { CashService } from '../cash/cash.service';

@Component({
    selector: 'hero-display',
    templateUrl: './hero-display.component.html',
    styleUrls: ['./hero-display.component.css']
})
export class HeroDisplayComponent implements OnInit {

    hero: IHero;
    isAutoAdventuring: boolean;
    intervalId: number;

    constructor(private _heroService: HeroService) {
        this.isAutoAdventuring = false;
        this.intervalId = 0;
    }

    adventure() {
        this._heroService.adventure();
    }

    ngOnInit() {
        this.hero = this._heroService.getHero();
    }

}
