import { Injectable } from '@angular/core';
import { IHero } from '../hero/hero';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentSlot } from './equipment-item';

@Injectable()
export class EquipmentService {
    
    heroEquipment: IEquipmentItem[];

    allEquipmentSlots: equipmentSlot[];

    equipmentSlotNames: string[];

    constructor() {
        this.allEquipmentSlots = [equipmentSlot.mainhand, equipmentSlot.offhand, equipmentSlot.armor, equipmentSlot.helm, equipmentSlot.legs,
        equipmentSlot.feet, equipmentSlot.hands, equipmentSlot.cloak, equipmentSlot.wrists, equipmentSlot.waist, equipmentSlot.shoulders,
        equipmentSlot.ring, equipmentSlot.amulet, equipmentSlot.accessory];

        this.equipmentSlotNames = ["Main Hand", "Off Hand", "Body", "Head", "Legs", "Feet", "Hands", "Back", "Wrists", "Waist",
        "Shoulders", "Finger", "Neck", "Accessory"];

        this.heroEquipment = [];

        this.equipmentSlotNames.forEach(e => this.heroEquipment.push(null));
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
}
