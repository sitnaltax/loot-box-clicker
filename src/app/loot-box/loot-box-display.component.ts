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

    boxState: string;
    isAnimating: boolean;
    animationsOwed: number;

    getCurrentlyOpeningBox(): IShopItem {
        return this._lootBoxService.getCurrentlyOpeningBox();
    }

    animationStarted(event: AnimationEvent) {
        if (event.toState == "begin") {
            this.isAnimating = true;
        }
    }

    animationEnded(event: AnimationEvent) {
        if (event.toState == "begin") {
            this.isAnimating = false;
        }
        if (this.animationsOwed > 0 && event.toState == "end") {
            this.animationsOwed--;
            this.boxState = "begin";
            window.setTimeout(() => {this.boxState = "end"}, 2500);
        }
    }

    ngOnInit() {
        this.isAnimating = false;
        this.boxState = "end";
        this.animationsOwed = 0;
        this._lootBoxService.progressNotification.subscribe((state) => {
            if (!this.isAnimating || state == "end") {
                this.boxState = state;
            }
            else {
                //else, we're already animating, and another begin came in
                this.animationsOwed++;
            }
        });
    }

}
