import { Component, OnInit } from '@angular/core';
import { CashService } from './cash.service';
import { ICash } from './cash';

@Component({
  selector: 'cash-display',
  templateUrl: './cash-display.component.html',
  styleUrls: ['./cash-display.component.css']
})
export class CashDisplayComponent implements OnInit {

    constructor(private _cashService: CashService) { }

    getCash(): ICash[] {
        return this._cashService.allCash;
    }

    getCurrencyName(cash: ICash) {
        return this._cashService.getCurrencyName(cash);
    }

    ngOnInit() {
    }

}
