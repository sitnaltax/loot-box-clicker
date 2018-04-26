import { Injectable } from '@angular/core';
import { IHero } from '../hero/hero';
import { ICash, cashType } from './cash';
import { IShopItem } from '../shop/shop-item';

@Injectable()
export class CashService {

    allCash: ICash[];

    constructor() {
        this.allCash = [];
    }

    getAllCash(): ICash[] {
        return this.allCash;
    }

    currencyNames: string[] = ["copper pieces", "denarii", "silver pieces", "bits coin", "carnival tickets",
        "gold pieces", "unobtainium pieces", "magic beans", "diamonds", "space bucks", "ether crystals", "soul gems",
        "infinity stones"];

    currencyRatios: number[] = [100, 80, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 9999999];

    getCurrencyName(cash: ICash) {
        return this.currencyNames[cash.currency];
    }

    adventure(hero: IHero) {
        //Cash earned = 2dPower - 1
        var adventurePower = Math.floor(Math.random() * hero.power + 1) + Math.floor(Math.random() * hero.power + 1) - 1;

        //1 in criticalChance odds of a multiplier, which can explode
        while (Math.random() < hero.criticalChance) {
            adventurePower *= hero.criticalPower;
        }

        var cashEarned = this.determineCashForAdventurePower(adventurePower);

        if (this.allCash[cashEarned.currency]) {
            this.allCash[cashEarned.currency].quantity += cashEarned.quantity;
        }
        else {
            this.allCash[cashEarned.currency] = cashEarned;
        }
    }

    determineCashForAdventurePower(power: number): ICash {
        let quantity = power;
        let currency = cashType.copper;
        while (quantity > this.currencyRatios[currency] && currency < cashType.CASHTYPE_MAX - 1) {
            quantity = Math.floor(quantity / this.currencyRatios[currency]);
            currency++;
        }
        return {quantity: quantity, currency:currency};
    }

    purchase(item: IShopItem): boolean {
        if (!(item.cost.currency in this.allCash)) {
            return false;
        }
        else if (item.cost.quantity > this.allCash[item.cost.currency].quantity) {
            return false;
        }
        else {
            this.allCash[item.cost.currency].quantity -= item.cost.quantity;
            return true;
        }

        //TODO grant the thing you just paid for
    }
}
