import { GameState } from './../../enums/game-state';
import { Component, Input } from '@angular/core';
import { Game } from 'src/app/interfaces/game';
import { DailyChallengeComponent } from '../daily-challenge/daily-challenge.component';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent {

  gState: typeof GameState = GameState;

  secondsToNewGame: Subscription;
  counter = 86400;
  tick: number = 1000;

  @Input() gameState!: GameState;
  @Input() gameToGuess!: Game;

  constructor(public dailyChall: DailyChallengeComponent) {
    this.secondsToNewGame = timer(0, this.tick).subscribe(() => --this.counter);
  }

  async ngOnInit() {
    this.counter = await this.dailyChall.myapp.gameService.steamdleService.getSecondsToNewGame();
  }

}
