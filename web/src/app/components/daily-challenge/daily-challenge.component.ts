import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game';
import { Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GameState } from 'src/app/enums/game-state';
import { DailyChallenge } from 'src/app/interfaces/daily-challenge';
import { GameDailyChallenge } from 'src/app/interfaces/game-data';

@Component({
	selector: 'app-daily-challenge',
	templateUrl: './daily-challenge.component.html',
	styleUrls: ['./daily-challenge.component.css']
})
export class DailyChallengeComponent implements OnInit {

	todaysGame: DailyChallenge | undefined;

	gameToGuess: Game = <Game>{};
	gameFormControl: FormControl = new FormControl();

	public playerTodaysGameStats: GameDailyChallenge | undefined;

	gState: GameState = GameState.InProgress;

	filteredOptions: Observable<Game[]> = new Observable<Game[]>;

	constructor(public myapp: AppComponent) {}

	async ngOnInit() {

		await this.myapp.gameService.dataLoaded;

		this.playerTodaysGameStats = this.myapp.gameService.GetCurrentGame();
		this.gameToGuess = this.myapp.steamGames.filter((game) => game.id === this.myapp.gameService.dailyChallenge.AppId).at(0)!;

		this.setFilteredGames();

	}

	private setFilteredGames(): void {

		this.filteredOptions = this.gameFormControl.valueChanges
			.pipe(
				startWith(''),
				map((value) => this.filterGames(value))
			);

	}

	/**
	 * filters games based on user input and only shows 10 games
	 * @param value
	 * @returns 
	 */
	private filterGames(value: string): Game[] {

		const filterValue: string = value.toLowerCase();
		const guessedGames: number[] = this.myapp.gameService.GetCurrentGame().GuessedGameIds;

		return this.myapp.steamGames.filter(
				options => !guessedGames.map((val) => val).includes(options.id) &&
							options.name.toLowerCase().includes(filterValue)
			).sort(this.myapp.compareGames).slice(0, 10);
	}

	/**
	 * handles user selecting game
	 * adds game to guessedGames array if the game isn't already guessed
	 * @param selectedGame 
	 * @returns 
	 */
	gameSelected(selectedGame: Game)
	{
		
		if(this.playerTodaysGameStats!.GuessedGameIds.indexOf(selectedGame.id) >= 0)
		{
			this.gameFormControl.setValue("");
			this.setFilteredGames();
			return;
		}

		this.playerTodaysGameStats!.GuessedGameIds.unshift(selectedGame.id);
		this.playerTodaysGameStats!.GuessedGameIds = [...this.playerTodaysGameStats!.GuessedGameIds];

		this.gameFormControl.setValue("");
		this.setFilteredGames();

		// check guessed game
		if(selectedGame.id == this.gameToGuess!.id) {

			this.gState = GameState.Won;
			return;

		} else if(this.playerTodaysGameStats!.GuessedGameIds.length >= this.myapp.gameService.maxNumberOfGuesses) {

			this.gState = GameState.Lost;
			return;
			
		}

		this.myapp.gameService.printDebugLog();

	}

	public isGameInProgress(): boolean {
		return this.gState == GameState.InProgress ? true : false;
	}

}
