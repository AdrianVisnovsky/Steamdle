import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { DailyChallengeComponent } from './components/daily-challenge/daily-challenge.component';
import { FooterComponent } from './components/footer/footer.component';
import { HowToPlayComponent } from './components/how-to-play/how-to-play.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { JsonprettyPipe } from './jsonpretty.pipe';
import { MultilineArrayPipe } from './multilinearray.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameResultComponent } from './components/game-result/game-result.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule }  from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GuessedGameRowComponent } from './components/guessed-game-row/guessed-game-row.component';
import { GuessedGamesComponent } from './components/guessed-games/guessed-games.component';
import { GamesFilterComponent } from './components/games-filter/games-filter.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { SinglelinearrayPipe } from './singlelinearray.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DailyChallengeComponent,
    FooterComponent,
    HowToPlayComponent,
    NotFoundComponent,
    JsonprettyPipe,
    MultilineArrayPipe,
    GameCardComponent,
    GameResultComponent,
    GuessedGameRowComponent,
    GuessedGamesComponent,
    GamesFilterComponent,
    AboutComponent,
    HomeComponent,
    SinglelinearrayPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSliderModule,
    MatDatepickerModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
