import { Component, OnInit } from '@angular/core';
import { IHero } from '../hero';

@Component({
  selector: 'hero-display',
  templateUrl: './hero-display.component.html',
  styleUrls: ['./hero-display.component.css']
})
export class HeroDisplayComponent implements OnInit {

    hero: IHero;
    
    constructor() {
    }

    ngOnInit() {
        this.hero = {name: "Rob", job: "Demi-Paladin"};
    }

}
