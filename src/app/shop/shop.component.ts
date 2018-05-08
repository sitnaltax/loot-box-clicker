import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { IShopItem } from './shop-item';
import { ICash } from '../cash/cash';
import { CashService } from '../cash/cash.service';
import { LootBoxService } from '../loot-box/loot-box-service';

@Component({
    selector: 'shop-display',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

    //TODO limit what's available to what the hero can afford with their cash
    constructor(private _shopService: ShopService, private _cashService: CashService,
         private _lootBoxService : LootBoxService)  { }

    getShopItems() : IShopItem[] {
        return this._shopService.getShopItems();
    }

    getCurrencyName(cash: ICash) {
        return this._cashService.getCurrencyName(cash);
    }

    purchase(item: IShopItem){
        if (this._cashService.purchase(item)){
            this._lootBoxService.addLootBox(item);
        }
    }

    ngOnInit() {
    }

}
