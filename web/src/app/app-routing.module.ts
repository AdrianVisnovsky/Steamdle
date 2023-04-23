import { NotFoundComponent } from './components/not-found/not-found.component';
import { HowToPlayComponent } from './components/how-to-play/how-to-play.component';
import { DailyChallengeComponent } from './components/daily-challenge/daily-challenge.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AvailableGamesComponent } from './components/available-games/available-games.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AboutComponent } from './components/about/about.component';
import { PatchNotesComponent } from './components/patch-notes/patch-notes.component';
import { TermsOfUseComponent } from './components/terms-of-use/terms-of-use.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

const routes: Routes = [
  {path: '', component: DailyChallengeComponent},
  {path: 'DailyChallenge/Normal', component: DailyChallengeComponent},
  {path: 'HowToPlay', component: HowToPlayComponent},
  {path: 'PrivacyPolicy', component: PrivacyPolicyComponent},
  {path: 'PatchNotes', component: PatchNotesComponent},
  {path: 'About', component: AboutComponent},
  {path: 'AvailableGames', component: AvailableGamesComponent},
  {path: 'TermsOfUse', component: TermsOfUseComponent},
  {path: 'PlayerStats', component: StatisticsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
