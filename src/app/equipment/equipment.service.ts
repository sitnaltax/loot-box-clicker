import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentSlot } from './equipment-item';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class EquipmentService {

    heroEquipment: IEquipmentItem[];

    allEquipmentSlots: equipmentSlot[];

    equipmentSlotNames: string[];

    constructor(private _storageService: StorageService) {
        this.allEquipmentSlots = [equipmentSlot.mainhand, equipmentSlot.offhand, equipmentSlot.armor, equipmentSlot.helm, equipmentSlot.legs,
        equipmentSlot.feet, equipmentSlot.hands, equipmentSlot.cloak, equipmentSlot.wrists, equipmentSlot.waist, equipmentSlot.shoulders,
        equipmentSlot.ring, equipmentSlot.amulet, equipmentSlot.accessory];

        this.equipmentSlotNames = ["Main Hand", "Off Hand", "Body", "Head", "Legs", "Feet", "Hands", "Back", "Wrists", "Waist",
            "Shoulders", "Finger", "Neck", "Accessory"];

        if (this._storageService.retrieve("equipment")) {
            this.heroEquipment = this._storageService.retrieve("equipment");
        }
        else {
            this.heroEquipment = [];
            this.equipmentSlotNames.forEach(e => this.heroEquipment.push(null));
        }

        this._storageService.autoSaveNotification.subscribe((dummy) => {
            this._storageService.store("equipment", this.heroEquipment);
        });

    }

    getSlotName(slot: equipmentSlot): string {
        return this.equipmentSlotNames[slot];
    }

    getAllEquipmentSlots(): equipmentSlot[] {
        return this.allEquipmentSlots;
    }

    getHeroEquipment(): IEquipmentItem[] {
        return this.heroEquipment;
    }

    //returns the old item;
    equip(item: IEquipmentItem): IEquipmentItem {
        let oldItem = this.heroEquipment[item.slot];
        this.heroEquipment[item.slot] = item;
        return oldItem;
    }

    calculatePower(): number {
        let totalPower = 1;
        this.getHeroEquipment().forEach(item => {
            if (item != null) {
                totalPower *= item.power;
            }
        })
        return totalPower;
    }
}
