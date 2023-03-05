import { Component } from '@angular/core';
import GamesDataJson from '../assets/gameData.json';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'steamdle';

  public steamGames: Game[] = GamesDataJson;

}
