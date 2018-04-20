import { Injectable } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { ShopService } from '../shop/shop-service';

@Injectable()
export class LootBoxService {
    
    //TODO: should probably be loaded
    
    lootBox: IShopItem;
    
    constructor(private _shopService: ShopService) {
        this.lootBox = null;
     }
    
    getLootBox(): IShopItem {
        return this.lootBox;
    }

    setLootBox(lootBox : IShopItem){
        this.lootBox = lootBox;
    }

    open(){
        this.lootBox = null;
    }
}
