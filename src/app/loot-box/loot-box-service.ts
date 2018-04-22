import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { ShopService } from '../shop/shop.service';
import { LootService } from './loot.service';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class LootBoxService {

    //TODO: should probably be loaded

    lootBox: IShopItem;

    constructor(private _shopService: ShopService, private _lootService: LootService,
        private _inventoryService: InventoryService) {
        this.lootBox = null;
    }

    getLootBox(): IShopItem {
        return this.lootBox;
    }

    setLootBox(lootBox: IShopItem) {
        this.lootBox = lootBox;
    }

    open() {
        this._lootService.getItemsForLootBox(this.lootBox).forEach(item => this._inventoryService.addToInventory(item));
        this.lootBox = null;
    }
}
