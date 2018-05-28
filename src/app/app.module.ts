import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeroDisplayComponent } from './hero/hero-display.component';
import { HeroService } from './hero/hero.service';
import { CashService } from './cash/cash.service';
import { CashDisplayComponent } from './cash/cash-display.component';
import { ShopComponent } from './shop/shop.component';
import { ShopService } from './shop/shop.service';
import { LootBoxDisplayComponent } from './loot-box/loot-box-display.component';
import { LootBoxService } from './loot-box/loot-box-service';
import { EquipmentDisplayComponent } from './equipment/equipment-display.component';
import { EquipmentService } from './equipment/equipment.service';
import { InventoryDisplayComponent } from './inventory/inventory-display.component';
import { InventoryService } from './inventory/inventory.service';
import { LootService } from './loot-box/loot.service';
import { StorageService } from './storage/storage.service';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ShopPageComponent } from './pages/shop-page/shop-page.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { TrainerPageComponent } from './pages/trainer-page/trainer-page.component';
import { TrainerDisplayComponent } from './trainer/trainer-display.component';
import { TrainerService } from './trainer/trainer.service';
import { RarityToColorPipe } from './shared/rarity-to-color.pipe';
import { DetailsEditComponent } from './details/details-edit/details-edit.component';
import { DetailsPageComponent } from './pages/details-page/details-page/details-page.component';
import {UpgradeStatusToColorPipe} from "./inventory/upgrade-status-to-color.pipe";

@NgModule({
    declarations: [
        AppComponent,
        HeroDisplayComponent,
        CashDisplayComponent,
        ShopComponent,
        LootBoxDisplayComponent,
        EquipmentDisplayComponent,
        InventoryDisplayComponent,
        HeroPageComponent,
        ShopPageComponent,
        InventoryPageComponent,
        TrainerPageComponent,
        TrainerDisplayComponent,
        RarityToColorPipe,
        UpgradeStatusToColorPipe,
        DetailsEditComponent,
        DetailsPageComponent
    ],
    imports: [
        NgbModule.forRoot(), BrowserModule, BrowserAnimationsModule, FormsModule, RouterModule.forRoot([
            { path: 'hero', component: HeroPageComponent },
            { path: 'shop', component: ShopPageComponent },
            { path: 'inventory', component: InventoryPageComponent },
            { path: 'trainer', component: TrainerPageComponent },
            { path: 'details', component: DetailsPageComponent },
            { path: '', redirectTo: 'hero', pathMatch: 'full' },
            { path: '**', redirectTo: 'hero', pathMatch: 'full' },
        ])
    ],
    providers: [HeroService, CashService, ShopService, LootBoxService, EquipmentService,
        InventoryService, LootService, StorageService, TrainerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
