import { Injectable } from '@angular/core';
import { IShopItem } from './shop-item';
import { cashType } from '../cash/cash';

@Injectable()
export class ShopService {

    constructor() {
     }
    
    getShopItems(): IShopItem[] {
        return [{chestName: "basic chest", cost: {currency: cashType.copper, quantity: 5}},
        {chestName: "ancient chest", cost: {currency: cashType.denarii, quantity: 15}}];
    }
}
