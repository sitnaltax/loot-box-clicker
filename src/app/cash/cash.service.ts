import { Injectable } from '@angular/core';
import { IHero } from '../hero/hero';
import { ICash, cashType } from './cash';

@Injectable()
export class CashService {
    
    allCash: ICash[];

    constructor() {
        this.allCash = [];
    }

    getAllCash(): ICash[]{
        return this.allCash;
    }

    currencyNames: string[] = ["copper pieces", "denarii", "silver pieces"];

    getCurrencyName(cash: ICash) {
        return this.currencyNames[cash.currency];
    }

    adventure(hero: IHero) {
        if (this.allCash[cashType.copper]){
            this.allCash[cashType.copper].quantity += 1;
        }
        else{
            this.allCash[cashType.copper] = {currency: cashType.copper, quantity: 1}
        }
    }
}
