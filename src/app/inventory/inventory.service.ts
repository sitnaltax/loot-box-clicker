import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentSlot } from '../equipment/equipment-item';

@Injectable()
export class InventoryService {

    inventory: IEquipmentItem[];

    equipmentSlotNames: string[];

    constructor() {
        this.inventory = [];
    }

    addToInventory(item: IEquipmentItem) {
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
}
