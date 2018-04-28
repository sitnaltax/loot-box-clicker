import { Injectable } from '@angular/core';
import { IShopItem } from './shop-item';
import { cashType } from '../cash/cash';

@Injectable()
export class ShopService {

    constructor() {
     }
    
    getShopItems(): IShopItem[] {
        return [{chestName: "rookie chest", cost: {currency: cashType.copper, quantity: 10}, rank: 0},
        {chestName: "basic chest", cost: {currency: cashType.copper, quantity: 100}, rank: 1},
        {chestName: "ancient chest", cost: {currency: cashType.denarii, quantity: 100}, rank: 2},
        {chestName: "enhanced chest", cost: {currency: cashType.silver, quantity: 100}, rank: 3},
        {chestName: "electronic chest", cost: {currency: cashType.bitcoin, quantity: 100}, rank: 4}];
    }
}
