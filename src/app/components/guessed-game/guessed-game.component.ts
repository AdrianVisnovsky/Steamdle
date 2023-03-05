import { Component, Input } from '@angular/core';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-guessed-game',
  templateUrl: './guessed-game.component.html',
  styleUrls: ['./guessed-game.component.css']
})
export class GuessedGameComponent {

  @Input() game!: Game;

}
