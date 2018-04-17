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
    
    constructor(private _heroService: HeroService, private _cashService: CashService) {
    }

    adventure() {
        this._cashService.adventure(this.hero);
    }

    ngOnInit() {
        this.hero = this._heroService.getHero();
    }

}
