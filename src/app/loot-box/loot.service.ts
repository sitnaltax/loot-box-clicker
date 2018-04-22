import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentType, equipmentSlot } from '../equipment/equipment-item';

//Responsible for determining what you get from a chest

@Injectable()
export class LootService {

    constructor() {
    }

    getItemsForLootBox(lootBox: IShopItem): IEquipmentItem[] {
        if (lootBox.chestName == "rookie chest") {
            return [{
                itemName: "Sword of Starting", type: equipmentType.equipabble, slot: equipmentSlot.mainhand,
                power: 3, value: 1
            }]
        }
        return [];
    }
}
