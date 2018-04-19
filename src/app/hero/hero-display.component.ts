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

    constructor(private _heroService: HeroService, private _cashService: CashService) {
        this.isAutoAdventuring = false;
        this.intervalId = 0;
    }

    adventure() {
        this._cashService.adventure(this.hero);
    }

    //TODO this should toggle the button appearance
    autoAdventure() {
        this.isAutoAdventuring = !this.isAutoAdventuring;
        if (this.isAutoAdventuring) {
            window.clearInterval(this.intervalId);
            this.intervalId = window.setInterval(() => {
                this.adventure();
            }
                , 1000);
        }
        else {
            window.clearInterval(this.intervalId);
        }
    }


    ngOnInit() {
        this.hero = this._heroService.getHero();
    }

}
