import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { ShopService } from '../shop/shop.service';
import { LootService } from './loot.service';
import { InventoryService } from '../inventory/inventory.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { TrainerService } from '../trainer/trainer.service';
import { skillId } from '../trainer/skill';

@Injectable()
export class LootBoxService {
    lootBoxList: IShopItem[];
    currentlyOpeningBox: IShopItem;
    lootBoxOpeningTime: number;
    lootBoxOpeningProgress: number;
    progressNotification: Observable<string>;
    private progressSubject: Subject<string>;

    constructor(private _shopService: ShopService, private _lootService: LootService, private _storageService: StorageService,
        private _inventoryService: InventoryService, private _trainerService: TrainerService) {
        if (this._storageService.retrieve('lootBoxes')) {
            this.lootBoxList = this._storageService.retrieve('lootBoxes');
        } else {
            this.lootBoxList = [];
        }

        this._storageService.autoSaveNotification.subscribe((dummy) => {
            this._storageService.store('lootBoxes', this.lootBoxList);
        });

        this._storageService.resetNotification.subscribe((dummy) => {
            this.lootBoxList = [];
            this.currentlyOpeningBox = null;
        });

        this.currentlyOpeningBox = null;
        this.lootBoxOpeningTime = 2500;
        this.progressSubject = new Subject<string>();
        this.progressNotification = this.progressSubject.asObservable();
        this.openBox();
    }

    addLootBox(lootBox: IShopItem) {
        this.lootBoxList.push(lootBox);
        this.openBox();
    }

    getCurrentlyOpeningBox(): IShopItem {
        return this.currentlyOpeningBox;
    }

    getLootBoxCount(): number {
        return this.lootBoxList.length;
    }

    openBox() {
        if (this.lootBoxList.length === 0) {
            return;
        }
        if (this.currentlyOpeningBox != null) {
            return;
        }
        this.progressSubject.next('box');
        this.currentlyOpeningBox = this.lootBoxList.pop();
        this.possiblyOpenBonusBoxes();
        window.setTimeout(() => {

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
    }

    possiblyOpenBonusBoxes() {
        while (this.lootBoxList.length > 0) {
            if (Math.random() > this._trainerService.getRanksForSkillById(skillId.advancedAvarice) * 0.07) {
                return;
            }
            const bonusBox: IShopItem = this.lootBoxList.pop();
            this._lootService.getItemsForLootBox(bonusBox).forEach(item => this._inventoryService.addToInventory(item));
        }
    }
}
