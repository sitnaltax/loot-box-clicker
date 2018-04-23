import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentType, equipmentSlot } from '../equipment/equipment-item';
import { EquipmentService } from "../equipment/equipment.service";

//Responsible for determining what you get from a chest

@Injectable()
export class LootService {

    allEquipmentSlots: equipmentSlot[]
    constructor(private _equipmentService: EquipmentService) {
        this.allEquipmentSlots = _equipmentService.getAllEquipmentSlots();
    }

    getItemsForLootBox(lootBox: IShopItem): IEquipmentItem[] {
        if (lootBox.rank == 0) {
            return [{
                itemName: "Sword of Starting", type: equipmentType.equipabble, slot: equipmentSlot.mainhand,
                power: 3, value: 1
            }]
        }
        return [];
    }

    getRandomSlotForLootBox(lootBox: IShopItem): equipmentSlot {
        return this.allEquipmentSlots[Math.floor(Math.random()*this.allEquipmentSlots.length)];
    }
}
