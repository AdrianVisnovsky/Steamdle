import { Component, Input } from '@angular/core';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-guessed-game-row',
  templateUrl: './guessed-game-row.component.html',
  styleUrls: ['./guessed-game-row.component.css']
})
export class GuessedGameRowComponent {

  @Input() game!: Game;

}
