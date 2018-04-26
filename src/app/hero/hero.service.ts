import { Injectable } from '@angular/core';
import { IHero } from './hero';
import { ICash } from '../cash/cash';
import { CashService } from '../cash/cash.service';
import { EquipmentService } from '../equipment/equipment.service';

@Injectable()
export class HeroService {
    
    //TODO: should probably be loaded
    
    hero: IHero;
    
    constructor(private _cashService: CashService, private _equipmentService: EquipmentService) {
        this.hero = {name: "Rob", job: "Demi-Druid", power: 1, criticalChance: 0.04, criticalPower: 5, fame: 0};
     }
    
    getHero(): IHero {
        return this.hero;
    }

    recalculatePower() {
        this.hero.power = this._equipmentService.calculatePower();
        this.hero.criticalChance = 0.04;
        this.hero.criticalPower = 5;
    }

    addKarma(fame: number) {
        this.hero.fame += fame;
    }
}
