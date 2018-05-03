import { Injectable } from '@angular/core';
import { IHero } from './hero';
import { EquipmentService } from '../equipment/equipment.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class HeroService {
    
    hero: IHero;
    
    constructor(private _storageService: StorageService, private _equipmentService: EquipmentService) {
        if (this._storageService.retrieve("hero")) {
            this.hero = this._storageService.retrieve("hero");
        }
        else {
            this.hero = {name: "Rob", job: "Demi-Druid", power: 1, criticalChance: 0.04, criticalPower: 5, fame: 0};
        }

        this._storageService.autoSaveNotification.subscribe((dummy) => {
            this._storageService.store("hero", this.hero);
        });

        this.recalculatePower();
     }
    
    getHero(): IHero {
        return this.hero;
    }

    recalculatePower() {
        this.hero.power = this._equipmentService.calculatePower();
    }

    addKarma(fame: number) {
        this.hero.fame += fame;
    }
}
