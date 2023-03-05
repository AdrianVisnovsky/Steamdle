import { SteamApp } from './../../interfaces/steam-app';
import { Component, OnInit } from '@angular/core';
import GamesDataJson from '../../../assets/gameData.json';
import { Game } from 'src/app/interfaces/game';
import { Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-daily-challenge',
	templateUrl: './daily-challenge.component.html',
	styleUrls: ['./daily-challenge.component.css']
})
export class DailyChallengeComponent implements OnInit {

	steamGames: Game[];
	gameToGuess: Game;
	guessedGames: Game[] = [];
	gameFormControl: FormControl = new FormControl();

	filteredOptions: Observable<Game[]> = new Observable<Game[]>;

	constructor() {

		this.steamGames = GamesDataJson;
		
		// pick one random game
		let randomIndex: number = Math.floor(Math.random() * this.steamGames.length);

		this.gameToGuess = this.steamGames[randomIndex];

		this.setFilteredGames();

	}

	ngOnInit() {}

	/**
	 * compares 2 games by their name
	 * we're able to sort them by name
	 * @param g1
	 * @param g2 
	 * @returns 
	 */
	private compareGames(g1: Game, g2: Game) {

		if(g1.name < g2.name) {
			return -1;
		}

		if (g1.name > g2.name) {
			return 1;
		}

		return 0;
	}

	private setFilteredGames(): void {

		this.filteredOptions = this.gameFormControl.valueChanges
			.pipe(
				startWith(''),
				map((value) => this.filgerGames(value))
			);

	}

	/**
	 * filters games based on user input and only shows 10 games
	 * @param value
	 * @returns 
	 */
	private filgerGames(value: string): Game[] {

		const filterValue: string = value.toLowerCase();
		return this.steamGames.filter(options => options.name.toLowerCase().includes(filterValue)).sort(this.compareGames).slice(0, 10);
	}

	/**
	 * handles user selecting game
	 * adds game to guessedGames array if the game isn't already guessed
	 * @param selectedGame 
	 * @returns 
	 */
	gameSelected(selectedGame: Game)
	{
		
		if(this.guessedGames.indexOf(selectedGame) >= 0)
			return;

		this.guessedGames.push(selectedGame);
		this.guessedGames = [...this.guessedGames];

		this.gameFormControl.setValue("");
		this.setFilteredGames();

	}

}
