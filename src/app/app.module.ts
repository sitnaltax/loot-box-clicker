import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeroDisplayComponent } from './hero/hero-display.component';
import { HeroService } from './hero/hero.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [HeroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
