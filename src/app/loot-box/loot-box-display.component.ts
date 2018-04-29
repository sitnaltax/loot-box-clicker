import { Component, OnInit } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { LootBoxService } from './loot-box-service';
import { trigger, state, style, animate, transition, sequence } from '@angular/animations';
@Component({
    selector: 'loot-box-display',
    templateUrl: './loot-box-display.component.html',
    styleUrls: ['./loot-box-display.component.css'],
    animations: [
        trigger('boxState', [
            state('begin', style({
                width: '100%',
            })),
            state('end', style({
                width: '0%',
            })),
            transition('end => begin', animate('2500ms')),
            transition('begin => end', animate('0ms'))
        ])
    ]
})
export class LootBoxDisplayComponent implements OnInit {
    constructor(private _lootBoxService: LootBoxService) {
    }

    boxState : string;

    getCurrentlyOpeningBox(): IShopItem {
        return this._lootBoxService.getCurrentlyOpeningBox();
    }

    getLootBoxProgress(): number {
        return this._lootBoxService.getLootBoxProgress();
    }

    ngOnInit() {
        this.boxState = "end";
        this._lootBoxService.progressNotification.subscribe((state) => {this.boxState = state;});
    }

}
