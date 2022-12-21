import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
