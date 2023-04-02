import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyChallengeInterface } from '../interfaces/daily-challenge-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SteamdleService {

  private defaultUrl: string = "http://127.0.0.1:8000";

  constructor(private http: HttpClient) { }

  public getDailyChallenge(): Observable<DailyChallengeInterface[]> {
      return this.http.get<DailyChallengeInterface[]>(this.defaultUrl + '/getDailyChallengeGame');
  }

}
