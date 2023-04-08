import { GameDailyChallenge } from './../interfaces/game-data';
import { DailyChallenge } from './../interfaces/daily-challenge';
import { Injectable } from '@angular/core';
import { SteamdleService } from './steamdle-service.service';
import { GameData } from '../interfaces/game-data';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

	public day: Date = <Date>{};
	public dailyChallenge: DailyChallenge = <DailyChallenge>{};
	public gameData: GameData = <GameData>{};

	public readonly maxNumberOfGuesses: number = 8;

	public dataLoaded: Promise<boolean>;

	public localStorageData_v1: string = 'steamdle-gamedata-v1';

	constructor(public steamdleService: SteamdleService) {
		this.dataLoaded = this.LoadData();
	}

	/**
	 * Loads data from API
	 * @returns 
	 */
	public async LoadData(): Promise<boolean>
	{

		this.day = await this.steamdleService.getServerDate();

		// get saved data from local storage
		this.getGameDataFromLocalStorage();

		// check if todays game is already loaded
		let gameAlreadyLoaded: boolean =
		this.gameData.GameDailyChallenge !== undefined &&
		this.gameData.GameDailyChallenge.filter((value) => {
			value.Day = this.day
		}).length > 0;

		// load game from API
		if(!gameAlreadyLoaded)
		{

			this.dailyChallenge = (await this.steamdleService.getDailyChallenge()).at(0)!;

			let todaysGame: GameDailyChallenge = <GameDailyChallenge>{};
			todaysGame.AppId = this.dailyChallenge.AppId;
			todaysGame.Day = this.day;
			todaysGame.GuessedGameIds = [];
			todaysGame.Guessed = false;
			todaysGame.Order = 0;

			if(this.gameData.GameDailyChallenge === undefined)
				this.gameData.GameDailyChallenge = [];

			this.gameData.GameDailyChallenge.push(todaysGame);

		}

		return Promise.resolve(true);
	}

	public GetCurrentGame(): GameDailyChallenge
	{
		return this.gameData.GameDailyChallenge.filter((val: GameDailyChallenge) => val.Day === this.day).at(0)!
	}

	/**
	 * Gets data from local storage
	 * @returns 
	 */
	public getGameDataFromLocalStorage() {

		let gameDataStr: string | null = localStorage.getItem(this.localStorageData_v1);
    
    	if(gameDataStr === null) {
    		return;
    	}

		console.log(gameDataStr);

  	}	

	/**
	 * Save data to local storage
	 * @returns 
	 */
	public saveGameDataToLocalStorage() {

		let gameDataStr: string = JSON.stringify(this.gameData);
		localStorage.setItem(this.localStorageData_v1, gameDataStr);

	}

	public printDebugLog()
	{
		console.log(this.gameData);
	}

}
