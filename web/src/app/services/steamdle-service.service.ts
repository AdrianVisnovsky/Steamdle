import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DailyChallenge } from '../interfaces/daily-challenge';
import { lastValueFrom } from 'rxjs';
import { AddSuccessfulGuessResult } from '../interfaces/add-successful-guess-result';
import { GameDailyStats } from '../interfaces/game-daily-stats';
import { LastDayStats } from '../interfaces/last-day-stats';
import { formatDate } from '@angular/common';
import { GameStatistics } from '../interfaces/game-statistics';

@Injectable({
  providedIn: 'root'
})
export class SteamdleService {

	private defaultUrl: string = "http://127.0.0.1:8000";
	private apiUrl: string = "https://api.steamdle.com";

	constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string) { }

	public getDailyChallenge(): Promise<DailyChallenge[]> {

		let url: string = this.apiUrl + '/getDailyChallengeGame';
		return lastValueFrom(this.http.get<DailyChallenge[]>(url));

	}

	public getServerDate(): Promise<any> {

		let url: string = this.apiUrl + '/getServerDate';
		return lastValueFrom(this.http.get(url, {responseType: 'text'}));

		//return this.http.get<Date>(this.defaultUrl + '/getServerDate', {responseType: 'text'});
	}

	public addSuccessfulGuess(day: Date): Promise<AddSuccessfulGuessResult[]> {

		let url: string = this.apiUrl + '/addSuccessfulGuess/' + formatDate(day, 'yyyy-MM-dd', this.locale);
		return lastValueFrom(this.http.get<AddSuccessfulGuessResult[]>(url));

	}

	public getNumberOfSuccesfullGuesses(day: Date): Promise<GameDailyStats[]> {

		let url: string = this.apiUrl + '/getNumberOfSuccesfullGuesses/' + formatDate(day, 'yyyy-MM-dd', this.locale);
		return lastValueFrom(this.http.get<GameDailyStats[]>(url));

	}

	public getLastDaysGameStats(): Promise<LastDayStats[]> {

		let url: string = this.apiUrl + '/getLastDaysGameStats';
		return lastValueFrom(this.http.get<LastDayStats[]>(url));

	}

	public getSecondsToNewGame(): Promise<number> {

		let url: string = this.apiUrl + '/getSecondsToNewGame';
		return lastValueFrom(this.http.get<number>(url));

	}

	public getGameStatistics(): Promise<GameStatistics[]> {

		let url: string = this.apiUrl + '/getGameStatistics';
		return lastValueFrom(this.http.get<GameStatistics[]>(url));

	}

}
