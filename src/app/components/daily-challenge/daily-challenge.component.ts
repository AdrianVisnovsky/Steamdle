import { AppComponent } from './../../app.component';
import { SteamApp } from './../../interfaces/steam-app';
import { Component, OnInit } from '@angular/core';
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

	gameToGuess: Game;
	guessedGames: Game[] = [];
	gameFormControl: FormControl = new FormControl();

	currentNumberOfGuesses:number = 0;
	maxNumberOfGuesses: number = 10;
	gameInProgess: boolean = true;

	filteredOptions: Observable<Game[]> = new Observable<Game[]>;

	constructor(public myapp: AppComponent) {

		// pick one random game
		let randomIndex: number = Math.floor(Math.random() * myapp.steamGames.length);

		this.gameToGuess = myapp.steamGames[randomIndex];

		this.setFilteredGames();

	}

	ngOnInit() {}

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
		return this.myapp.steamGames.filter(options => options.name.toLowerCase().includes(filterValue)).sort(this.myapp.compareGames).slice(0, 10);
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
		{
			this.gameFormControl.setValue("");
			this.setFilteredGames();
			return;
		}

		this.guessedGames.unshift(selectedGame);
		this.guessedGames = [...this.guessedGames];

		this.currentNumberOfGuesses += 1;

		this.gameFormControl.setValue("");
		this.setFilteredGames();

		// check guessed game
		if(selectedGame.id == this.gameToGuess.id) {

			this.gameInProgess = false;
			alert("gg wp");
			return;

		} else if(this.currentNumberOfGuesses >= this.maxNumberOfGuesses) {

			this.gameInProgess = false;
			alert("looser");
			return;
			
		}

	}

}
