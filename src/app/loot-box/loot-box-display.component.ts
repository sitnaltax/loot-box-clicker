import { Component, OnInit } from '@angular/core';
import { IShopItem } from '../shop/shop-item';
import { LootBoxService } from './loot-box-service';
import { AnimationEvent, trigger, state, style, animate, transition, sequence } from '@angular/animations';
@Component({
    selector: 'loot-box-display',
    templateUrl: './loot-box-display.component.html',
    styleUrls: ['./loot-box-display.component.css'],
    animations: [
        trigger('boxState', [
            state('end', style({
                width: '100%',
            })),
            state('begin', style({
                width: '0%',
            })),
            transition('begin => end', animate('2400ms')),
            transition('end => begin', animate('0ms'))
        ])
    ]
})
export class LootBoxDisplayComponent implements OnInit {
    constructor(private _lootBoxService: LootBoxService) {
    }

    boxState: string;
    isAnimating: boolean;

    getCurrentlyOpeningBox(): IShopItem {
        return this._lootBoxService.getCurrentlyOpeningBox();
    }

    getLootBoxCount(): number {
        return this._lootBoxService.getLootBoxCount();
    }

    animationStarted(event: AnimationEvent) {
        if (event.toState == "end") {
            this.isAnimating = true;
        }
    }

    animationEnded(event: AnimationEvent) {
        if (event.toState == "end") {
            this.isAnimating = false;
            this.boxState = "begin";
        }
    }

    ngOnInit() {
        this.isAnimating = false;
        this.boxState = "begin";
        this._lootBoxService.progressNotification.subscribe((state) => {
            if (!this.isAnimating) {
                this.boxState = "end";
            }
        });
    }

}
