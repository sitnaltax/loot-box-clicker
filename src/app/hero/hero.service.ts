import { Injectable } from '@angular/core';
import { IHero } from './hero';
import { ICash } from '../cash/cash';
import { CashService } from '../cash/cash.service';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class HeroService {
    
    //TODO: should probably be loaded
    
    hero: IHero;
    
    constructor(private _cashService: CashService, private _inventoryService: InventoryService) {
        this.hero = {name: "Rob", job: "Demi-Druid", power: 1, criticalChance: 0.05, criticalPower: 10};
     }
    
    getHero(): IHero {
        return this.hero;
    }

    recalculatePower() {
        var totalPower = 1;
        this._inventoryService.getInventory().forEach(item => {
            if (item == null) {
                return;
            }
            totalPower *= item.power;
        })
        this.hero.power = totalPower;
        this.hero.criticalChance = 0.05;
        this.hero.criticalPower = 10;
    }
}
