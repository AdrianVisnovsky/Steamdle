import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DailyChallenge } from '../interfaces/daily-challenge';
import { lastValueFrom } from 'rxjs';
import { AddSuccessfulGuessResult } from '../interfaces/add-successful-guess-result';
import { GameDailyStats } from '../interfaces/game-daily-stats';
import { YesterdaysGameId } from '../interfaces/yesterdays-game-id';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SteamdleService {

	private defaultUrl: string = "http://127.0.0.1:8000";

	constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string) { }

	public getDailyChallenge(): Promise<DailyChallenge[]> {

		let url: string = this.defaultUrl + '/getDailyChallengeGame';
		return lastValueFrom(this.http.get<DailyChallenge[]>(url));

	}

	public getServerDate(): Promise<any> {

		let url: string = this.defaultUrl + '/getServerDate';
		return lastValueFrom(this.http.get(url, {responseType: 'text'}));

		//return this.http.get<Date>(this.defaultUrl + '/getServerDate', {responseType: 'text'});
	}

	public addSuccessfulGuess(day: Date): Promise<AddSuccessfulGuessResult[]> {

		let url: string = this.defaultUrl + '/addSuccessfulGuess/' + formatDate(day, 'yyyy-MM-dd', this.locale);
		return lastValueFrom(this.http.get<AddSuccessfulGuessResult[]>(url));

	}

	public getNumberOfSuccesfullGuesses(day: Date): Promise<GameDailyStats[]> {

		let url: string = this.defaultUrl + '/getNumberOfSuccesfullGuesses/' + formatDate(day, 'yyyy-MM-dd', this.locale);
		return lastValueFrom(this.http.get<GameDailyStats[]>(url));

	}

	public getLastDaysGameId(): Promise<YesterdaysGameId[]> {

		let url: string = this.defaultUrl + '/getLastDaysGameId';
		return lastValueFrom(this.http.get<YesterdaysGameId[]>(url));

	}

	public getSecondsToNewGame(): Promise<number> {

		let url: string = this.defaultUrl + '/getSecondsToNewGame';
		return lastValueFrom(this.http.get<number>(url));

	}

}
