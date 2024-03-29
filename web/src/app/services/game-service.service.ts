import { GameDailyChallenge } from './../interfaces/game-data';
import { Injectable } from '@angular/core';
import { SteamdleService } from './steamdle-service.service';
import { GameData } from '../interfaces/game-data';
import { GameState } from '../enums/game-state';
import { AddSuccessfulGuessResult } from '../interfaces/add-successful-guess-result';
import { GameDailyStats } from '../interfaces/game-daily-stats';
import { LastDayStats } from '../interfaces/last-day-stats';
import { AppServiceService } from './app-service.service';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

	public day: Date = <Date>{};
	public gameData: GameData = <GameData>{};
	public gameDailyStats: GameDailyStats = <GameDailyStats>{};
	public lastDayStats: LastDayStats | undefined;

	public readonly maxNumberOfGuesses: number = 8;

	public dataLoaded: Promise<boolean>;

	public localStorageData_v1: string = 'steamdle-gamedata-v1';
	public localStorageAnnouncementBeta: string = 'steamdle-announcementBeta';

	constructor(public steamdleService: SteamdleService) {
		this.dataLoaded = this.LoadData();
	}

	public resetStorage()
	{
		localStorage.removeItem(this.localStorageData_v1);
		localStorage.removeItem(this.localStorageAnnouncementBeta);
	}

	public getAnnouncementVisible(): boolean
	{

		let lastAnnoucementVersion: string | null = localStorage.getItem(this.localStorageAnnouncementBeta);
		if(lastAnnoucementVersion === null)
			return true;

		return lastAnnoucementVersion !== AppServiceService.gameVersion;
	}

	public setAnnouncementVisible(): void
	{
		localStorage.setItem(this.localStorageAnnouncementBeta, AppServiceService.gameVersion);
	}

	/**
	 * Loads data from API
	 * @returns 
	 */
	public async LoadData(): Promise<boolean>
	{

		//this.resetStorage();

		this.day = await this.steamdleService.getServerDate();

		// get saved data from local storage
		this.getGameDataFromLocalStorage();

		// check if todays game is already loaded
		let gameAlreadyLoaded: boolean =
			this.gameData.GameDailyChallenge !== undefined &&
			this.gameData.GameDailyChallenge.filter((value) => value.Day === this.day).length > 0;

		// load game from API
		if(!gameAlreadyLoaded) {

			let dailyChall = await this.steamdleService.getDailyChallenge();

			let todaysGame: GameDailyChallenge = <GameDailyChallenge>{};
			todaysGame.AppId = dailyChall.at(0)!.AppId;
			todaysGame.Day = this.day;
			todaysGame.GuessedGameIds = [];
			todaysGame.GameState = GameState.InProgress;
			todaysGame.Order = 0;

			if(this.gameData.GameDailyChallenge === undefined)
				this.gameData.GameDailyChallenge = [];

			this.gameData.GameDailyChallenge.push(todaysGame);
			this.saveGameDataToLocalStorage();

		}

		this.gameDailyStats = (await this.steamdleService.getNumberOfSuccesfullGuesses(this.day)).at(0)!;

		let lDayStats: LastDayStats[] = await this.steamdleService.getLastDaysGameStats();
		if(lDayStats !== undefined && lDayStats.length > 0)
		{
			this.lastDayStats = lDayStats.at(0)!;
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
    
    	if(gameDataStr === null)
    		return;

		this.gameData = JSON.parse(gameDataStr);

  	}	

	/**
	 * Save data to local storage
	 * @returns 
	 */
	public saveGameDataToLocalStorage() {

		let gameDataStr: string = JSON.stringify(this.gameData);
		localStorage.setItem(this.localStorageData_v1, gameDataStr);

	}

	public async addGuessedGame(gameToAddId: number) {

		let currGame: GameDailyChallenge = this.GetCurrentGame();

		if(currGame.GuessedGameIds.indexOf(gameToAddId) >= 0)
			return;

		currGame.GuessedGameIds.unshift(gameToAddId);
		currGame.GuessedGameIds = [...currGame.GuessedGameIds];

		// check guessed game
		if(gameToAddId === currGame.AppId) {

			currGame.GameState = GameState.Won;
			let playerOrder: AddSuccessfulGuessResult = (await this.steamdleService.addSuccessfulGuess(this.day)).at(0)!;
			currGame.Order = playerOrder.Guessed;

			this.gameDailyStats = (await this.steamdleService.getNumberOfSuccesfullGuesses(this.day)).at(0)!;

		} else if(currGame.GuessedGameIds.length >= this.maxNumberOfGuesses) {
			currGame.GameState = GameState.Lost;
			this.gameDailyStats = (await this.steamdleService.getNumberOfSuccesfullGuesses(this.day)).at(0)!;
		}

		//this.printDebugLog();
		this.saveGameDataToLocalStorage()

	}

	public printDebugLog()
	{
		console.log(this.gameData);
	}

}
