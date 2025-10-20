import { Component } from '@angular/core';
import GamesDataJson from '../assets/gameDataMinified.json';
import { Game } from 'src/app/interfaces/game';
import { GameServiceService } from './services/game-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {

  title = 'steamdle';

  public steamGames: Game[] = GamesDataJson.sort(this.compareGames);

  public minReleasedYear: number;
  public maxReleasedYear: number;

  public minScore: number;
  public maxScore: number;

  constructor(public gameService: GameServiceService)
  {

    this.minReleasedYear = this.steamGames.reduce(function(prev, curr) {
      return prev.released < curr.released ? prev : curr;
    }).released;

    this.maxReleasedYear = this.steamGames.reduce(function(prev, curr) {
      return prev.released > curr.released ? prev : curr;
    }).released;

    this.minScore = Math.min(...this.steamGames.map(item => item.score));
    this.maxScore = Math.max(...this.steamGames.map(item => item.score));

  }

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
