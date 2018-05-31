import { Component, OnInit } from '@angular/core';
import { CashService } from './cash.service';
import { ICash } from './cash';
import { HeroService } from '../hero/hero.service';

@Component({
  selector: 'cash-display',
  templateUrl: './cash-display.component.html',
  styleUrls: ['./cash-display.component.css']
})
export class CashDisplayComponent implements OnInit {

    constructor(private _cashService: CashService,
                private _heroService: HeroService) { }

    getCash(): ICash[] {
        return this._cashService.allCash.filter((c) => c.quantity > 0);
    }

    getCurrencyName(cash: ICash) {
        return this._cashService.getCurrencyName(cash);
    }

    donateCash() {
        this._heroService.donateCash();
    }

    ngOnInit() {
    }

}
