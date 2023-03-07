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

  public steamGames: Game[] = GamesDataJson.sort(this.compareGames);

  /**
     * compares 2 games by their name
     * we're able to sort them by name
     * @param g1
     * @param g2 
     * @returns 
     */
  public compareGames(g1: Game, g2: Game) {

    if(g1.name < g2.name) {
      return -1;
    }

    if (g1.name > g2.name) {
      return 1;
    }

    return 0;
  }

}
