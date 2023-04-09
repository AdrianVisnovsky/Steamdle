import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyChallenge } from '../interfaces/daily-challenge';
import { Observable, lastValueFrom } from 'rxjs';

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

	public addSuccessfulGuess(day: Date): Promise<number> {

		let url: string = this.defaultUrl + '/addSuccessfulGuess/' + day;
		console.log(url);
		return lastValueFrom(this.http.get<number>(url));

	}

}
