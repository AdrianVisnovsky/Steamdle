import { AppComponent } from './../../app.component';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/game';
import { Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { GameState } from 'src/app/enums/game-state';
import { DailyChallenge } from 'src/app/interfaces/daily-challenge';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
	selector: 'app-daily-challenge',
	templateUrl: './daily-challenge.component.html',
	styleUrls: ['./daily-challenge.component.css']
})
export class DailyChallengeComponent implements OnInit {

	todaysGame: DailyChallenge | undefined;

	gameToGuess: Game = <Game>{};
	gameFormControl: FormControl = new FormControl();

	filteredOptions: Observable<Game[]> = new Observable<Game[]>;

	constructor(public myapp: AppComponent) {}

	async ngOnInit() {

		await this.myapp.gameService.dataLoaded;
		this.gameToGuess = this.myapp.steamGames.filter((game) => game.id === this.myapp.gameService.GetCurrentGame().AppId).at(0)!;

		this.announcementVisible = this.myapp.gameService.getAnnouncementVisible();
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
	public async gameSelected(selectedGameId: number)
	{

		await this.myapp.gameService.addGuessedGame(selectedGameId);

		this.gameFormControl.setValue("");
		this.setFilteredGames();

	}

	public isGameInProgress(): boolean {
		return this.myapp.gameService.GetCurrentGame().GameState == GameState.InProgress ? true : false;
	}

	public getYesterdaysGameName(): string {
		return this.myapp.steamGames.filter(options => options.id === this.myapp.gameService.lastDayStats!.AppId).at(0)!.name;
	}

	public getYesterdaysGameOrder(): number {
		return this.myapp.gameService.lastDayStats!.GameOrder;
	}

	public getYesterdaysGameGuessed(): number {
		return this.myapp.gameService.lastDayStats!.Guessed;
	}

	public announcementVisible: boolean = false;

	public closeAnnouncement(): void
	{
		this.announcementVisible = false;
		this.myapp.gameService.setAnnouncementVisible();
	}

	public getGameVersion(): string {
		return AppServiceService.gameVersion;
	}

}
