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
        {chestName: "electronic chest", cost: {currency: cashType.bitcoin, quantity: 100}, rank: 4},
        {chestName: "whimsical chest", cost: {currency: cashType.tickets, quantity: 100}, rank: 5},
        {chestName: "gold chest", cost: {currency: cashType.gold, quantity: 100}, rank: 6},
        {chestName: "forbidden chest", cost: {currency: cashType.unobtainium, quantity: 100}, rank: 7},
        {chestName: "living chest", cost: {currency: cashType.beans, quantity: 100}, rank: 8},
        {chestName: "adamantine chest", cost: {currency: cashType.diamonds, quantity: 100}, rank: 9},
        {chestName: "interstellar chest", cost: {currency: cashType.spacebucks, quantity: 100}, rank: 10},
        {chestName: "gossamer chest", cost: {currency: cashType.ether, quantity: 100}, rank: 11},
        {chestName: "gothic chest", cost: {currency: cashType.soulgems, quantity: 100}, rank: 12},
        {chestName: "cosmic chest", cost: {currency: cashType.infinity, quantity: 100}, rank: 13},
        {chestName: "chest of completion", cost: {currency: cashType.completion, quantity: 2500}, rank: 14}];
    }
}
