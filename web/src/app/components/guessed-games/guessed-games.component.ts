import { DailyChallengeComponent } from './../daily-challenge/daily-challenge.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-guessed-games',
  templateUrl: './guessed-games.component.html',
  styleUrls: ['./guessed-games.component.css']
})
export class GuessedGamesComponent {

	constructor(public myDailyChallengeComponent: DailyChallengeComponent) {}

}
