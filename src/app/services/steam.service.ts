import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SteamApps } from '../interfaces/steam-apps';

@Injectable({
	providedIn: 'root'
})
export class SteamService {

	private baseUrl: string = 'https://api.steampowered.com/';

	constructor(private httpClient: HttpClient) { }

	getAllGames(): Observable<SteamApps> {

		//var url: string = this.baseUrl + 'ISteamApps/GetAppList/v0002/?format=json';
		var url: string = 'https://api.npoint.io/43079c9505a598a229e9';

		return this.httpClient.get<SteamApps>(url);
	}

	getGameDetail(appId: number) {

		var url: string = 'https://store.steampowered.com/api/appdetails?appids=' + appId;

		var headers = new HttpHeaders();
		headers = headers.append('Access-Control-Allow-Origin', '*');
		headers = headers.append('Access-Control-Allow-Methods', 'GET');

		return this.httpClient.get(url, {headers});
	}

}
