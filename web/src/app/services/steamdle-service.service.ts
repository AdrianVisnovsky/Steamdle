import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyChallenge } from '../interfaces/daily-challenge';
import { lastValueFrom } from 'rxjs';
import { AddSuccessfulGuessResult } from '../interfaces/add-successful-guess-result';
import { GameDailyStats } from '../interfaces/game-daily-stats';

@Injectable({
  providedIn: 'root'
})
export class SteamdleService {

	private defaultUrl: string = "http://127.0.0.1:8000";

	constructor(private http: HttpClient) { }

	public getDailyChallenge(): Promise<DailyChallenge[]> {

		let url: string = this.defaultUrl + '/getDailyChallengeGame';
		return lastValueFrom(this.http.get<DailyChallenge[]>(url));

	}

	public getServerDate(): Promise<any> {

		let url: string = this.defaultUrl + '/getServerDate';
		return lastValueFrom(this.http.get(url, {responseType: 'text'}));

		//return this.http.get<Date>(this.defaultUrl + '/getServerDate', {responseType: 'text'});
	}

	public getServerDateTime(): Promise<Date> {

		let url: string = this.defaultUrl + '/getServerDateTime';
		return lastValueFrom(this.http.get<Date>(url));

	}

	public addSuccessfulGuess(day: Date): Promise<AddSuccessfulGuessResult[]> {

		let url: string = this.defaultUrl + '/addSuccessfulGuess/' + day;
		return lastValueFrom(this.http.get<AddSuccessfulGuessResult[]>(url));

	}

	public getNumberOfSuccesfullGuesses(day: Date): Promise<GameDailyStats[]> {

		let url: string = this.defaultUrl + '/getNumberOfSuccesfullGuesses/' + day;
		return lastValueFrom(this.http.get<GameDailyStats[]>(url));

	}

}
