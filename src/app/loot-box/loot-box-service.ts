import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { ShopService } from '../shop/shop.service';
import { LootService } from './loot.service';
import { InventoryService } from '../inventory/inventory.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LootBoxService {

    lootBoxList: IShopItem[];
    currentlyOpeningBox: IShopItem;
    openIntervalId: number;
    lootBoxOpeningTime: number;
    lootBoxOpeningProgress: number;
    progressNotification: Observable<string>;
    private progressSubject: Subject<string>;

    constructor(private _shopService: ShopService, private _lootService: LootService,
        private _inventoryService: InventoryService) {
        this.lootBoxList = [];
        this.currentlyOpeningBox = null;
        this.lootBoxOpeningTime = 2500;
        this.progressSubject = new Subject<string>();
        this.progressNotification = this.progressSubject.asObservable();
    }

    addLootBox(lootBox: IShopItem) {
        this.lootBoxList.push(lootBox);
        this.openBox();
    }

    getCurrentlyOpeningBox(): IShopItem {
        return this.currentlyOpeningBox;
    }

    openBox() {
        if (this.lootBoxList.length == 0) {
            return;
        }
        if (this.currentlyOpeningBox != null) {
            return;
        }
        this.progressSubject.next("begin");
        this.currentlyOpeningBox = this.lootBoxList.pop();
        window.clearInterval(this.openIntervalId);
        this.openIntervalId = window.setInterval(() => {

            this.gainLoot();
            this.openBox();
        }
            , this.lootBoxOpeningTime);
    }

    gainLoot() {
        if (this.currentlyOpeningBox == null) {
            return;
        }

        this._lootService.getItemsForLootBox(this.currentlyOpeningBox).forEach(item => this._inventoryService.addToInventory(item));
        this.currentlyOpeningBox = null;
        this.progressSubject.next("end");
    }
}
