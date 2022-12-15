import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DailyChallengeComponent } from './components/daily-challenge/daily-challenge.component';
import { FooterComponent } from './components/footer/footer.component';
import { HowToPlayComponent } from './components/how-to-play/how-to-play.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DailyChallengeComponent,
    FooterComponent,
    HowToPlayComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
