import { GameState } from './../../enums/game-state';
import { Component, Input } from '@angular/core';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.css']
})
export class GameResultComponent {

  gState: typeof GameState = GameState;

  @Input() gameState!: GameState;
  @Input() gameToGuess!: Game;

}
