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

	filteredOptions: Observable<Game[]>;

	constructor() {

		this.steamGames = GamesDataJson;
		
		// pick one random game
		let randomIndex: number = Math.floor(Math.random() * this.steamGames.length);

		this.gameToGuess = this.steamGames[randomIndex];

		this.filteredOptions = this.gameFormControl.valueChanges
			.pipe(
				startWith(''),
				map((value) => this._filter(value))
			);

	}

	ngOnInit()
	{

	}

	private compareGames(g1: Game, g2: Game) {

		if(g1.name < g2.name) {
			return -1;
		}

		if (g1.name > g2.name) {
			return 1;
		}

		return 0;
	}

	private _filter(value: string): Game[] {

		const filterValue: string = value.toLowerCase();
		return this.steamGames.filter(options => options.name.toLowerCase().includes(filterValue)).sort(this.compareGames).slice(0, 10);
	}

	printGameName(g: Game): string {
		return g.name;
	}

	gameSelected(selectedGame: Game)
	{
		
		if(this.guessedGames.indexOf(selectedGame) >= 0)
			return;

		this.guessedGames.push(selectedGame);
		this.guessedGames = [...this.guessedGames];

		this.gameFormControl.reset();
	}

}
