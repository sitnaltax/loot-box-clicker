import { Injectable } from '@angular/core';
import { IHero } from './hero';
import { ICash } from '../cash/cash';
import { CashService } from '../cash/cash.service';

@Injectable()
export class HeroService {
    
    //TODO: should probably be loaded
    
    hero: IHero;
    
    constructor(private _cashService: CashService) {
        this.hero = {name: "Rob", job: "Demi-Druid"};
     }
    
    getHero(): IHero {
        return this.hero;
    }
}
