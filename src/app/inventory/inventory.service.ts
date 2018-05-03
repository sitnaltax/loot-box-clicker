import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { IEquipmentItem, equipmentSlot } from '../equipment/equipment-item';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class InventoryService {

    inventory: IEquipmentItem[];

    equipmentSlotNames: string[];

    constructor(private _storageService: StorageService) {
        if (this._storageService.retrieve("inventory")) {
            this.inventory = this._storageService.retrieve("inventory");
        }
        else {
            this.inventory = [];
        }

        this._storageService.autoSaveNotification.subscribe((dummy) => {
            this._storageService.store("inventory", this.inventory);
        });
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
