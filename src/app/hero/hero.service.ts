import { Injectable } from '@angular/core';
import { IHero } from './hero';

@Injectable()
export class HeroService {
    
    //TODO: should probably be loaded
    
    hero: IHero;
    
    constructor() {
        this.hero = {name: "Rob", job: "Demi-Druid"};
     }
    
    getHero(): IHero {
        return this.hero;
    }
}
