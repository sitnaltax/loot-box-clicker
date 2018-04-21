import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeroDisplayComponent } from './hero/hero-display.component';
import { HeroService } from './hero/hero.service';
import { CashService } from './cash/cash.service';
import { CashDisplayComponent } from './cash/cash-display.component';
import { ShopComponent } from './shop/shop.component';
import { ShopService } from './shop/shop-service';
import { LootBoxDisplayComponent } from './loot-box/loot-box-display.component';
import { LootBoxService } from './loot-box/loot-box-service';
import { EquipmentDisplayComponent } from './equipment/equipment-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroDisplayComponent,
    CashDisplayComponent,
    ShopComponent,
    LootBoxDisplayComponent,
    EquipmentDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [HeroService, CashService, ShopService, LootBoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
