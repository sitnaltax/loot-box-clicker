import { Component, OnInit } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { LootBoxService } from './loot-box-service';

@Component({
    selector: 'loot-box-display',
    templateUrl: './loot-box-display.component.html',
    styleUrls: ['./loot-box-display.component.css']
})
export class LootBoxDisplayComponent implements OnInit {


    constructor(private _lootBoxService : LootBoxService) {
    }

    getLootBox(){
        return this._lootBoxService.getLootBox();
    }

    open(){
        this._lootBoxService.open();
    }

    ngOnInit() {
    }

}
