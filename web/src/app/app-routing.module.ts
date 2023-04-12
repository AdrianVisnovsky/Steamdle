import { NotFoundComponent } from './components/not-found/not-found.component';
import { HowToPlayComponent } from './components/how-to-play/how-to-play.component';
import { DailyChallengeComponent } from './components/daily-challenge/daily-challenge.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AvailableGamesComponent } from './components/available-games/available-games.component';

const routes: Routes = [
  {path: '', component: DailyChallengeComponent},
  {path: 'DailyChallenge/Normal', component: DailyChallengeComponent},
  {path: 'HowToPlay', component: HowToPlayComponent},
  {path: 'AvailableGames', component: AvailableGamesComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
