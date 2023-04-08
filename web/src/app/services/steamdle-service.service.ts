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
		return lastValueFrom(this.http.get<DailyChallenge[]>(this.defaultUrl + '/getDailyChallengeGame'));
	}

	public getServerDate(): Promise<any> {

		let url: string = this.defaultUrl + '/getServerDate';
		return lastValueFrom(this.http.get(url, {responseType: 'text'}));

		//return this.http.get<Date>(this.defaultUrl + '/getServerDate', {responseType: 'text'});
	}

	public getServerDateTime(): Promise<Date> {
		return lastValueFrom(this.http.get<Date>(this.defaultUrl + '/getServerDateTime'));
	}

	//public addSuccessfulGuess(day: Date): Observable<number> {
		//return this.http.put<number>(this.defaultUrl + '/addSuccessfulGuess/' + day);
	//}

}
