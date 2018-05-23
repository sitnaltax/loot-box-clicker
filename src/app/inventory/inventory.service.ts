import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentSlot, equipmentType } from '../equipment/equipment-item';
import { StorageService } from '../storage/storage.service';
import { TrainerService } from '../trainer/trainer.service';
import { EquipmentService } from '../equipment/equipment.service';
import { skillId } from '../trainer/skill';
import { HeroService } from '../hero/hero.service';

@Injectable()
export class InventoryService {

    inventory: IEquipmentItem[];

    equipmentSlotNames: string[];

    constructor(private _storageService: StorageService, private _equipmentService: EquipmentService,
        private _trainerService: TrainerService, private _heroService: HeroService) {
        if (this._storageService.retrieve("inventory")) {
            this.inventory = this._storageService.retrieve("inventory");
        }
        else {
            this.inventory = [];
        }

        this._storageService.autoSaveNotification.subscribe((dummy) => {
            this._storageService.store("inventory", this.inventory);
        });

        this._storageService.resetNotification.subscribe((dummy) => {
            this.inventory = [];
        });
    }

    addToInventory(item: IEquipmentItem) {
        //possibly auto-donate
        if (this.checkShouldAutoDonate(item)) {
            //now have to make the check. The chance of NOT being able to auto-donate is (0.75 ^ (ranks in autodonate))
            let chance = 1 - Math.pow(3/4, this._trainerService.getRanksForSkillById(skillId.autoDonate));
            if (Math.random() < chance) {
                this._heroService.addKarma(item.value);
                console.log("Auto-donated a " + item.itemName + " with value: " + item.value);
                return; //And it's gone
            }
        }
        this.inventory.push(item);
    }

    removeFromInventory(item: IEquipmentItem) {
        var index = this.inventory.indexOf(item, 0);
        if (index > -1) {
            this.inventory.splice(index, 1);
        }
    }

    getInventory() {
        return this.inventory;
    }

    checkShouldAutoDonate(item: IEquipmentItem): boolean {
        if (item.type == equipmentType.art) {
            return true;
        }
        else if (item.type == equipmentType.equippable) {
            let existingEquipment: IEquipmentItem = this._equipmentService.getHeroEquipment()[item.slot];
            if (existingEquipment == null) {
                return false;
            }
            return (item.power < existingEquipment.power);
        }
        else {
            return false;
        }
    }
}
