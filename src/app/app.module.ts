import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeroDisplayComponent } from './hero/hero-display.component';
import { HeroService } from './hero/hero.service';
import { CashService } from './cash/cash.service';
import { CashDisplayComponent } from './cash/cash-display.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroDisplayComponent,
    CashDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [HeroService, CashService],
  bootstrap: [AppComponent]
})
export class AppModule { }
