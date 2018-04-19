import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeroDisplayComponent } from './hero/hero-display.component';
import { HeroService } from './hero/hero.service';
import { CashService } from './cash/cash.service';
import { CashDisplayComponent } from './cash/cash-display.component';
import { ShopComponent } from './shop/shop.component';
import { ShopService } from './shop/shop-service';

@NgModule({
  declarations: [
    AppComponent,
    HeroDisplayComponent,
    CashDisplayComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [HeroService, CashService, ShopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
