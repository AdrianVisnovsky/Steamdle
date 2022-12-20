import { SteamService } from './../../services/steam.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-daily-challenge',
	templateUrl: './daily-challenge.component.html',
	styleUrls: ['./daily-challenge.component.css']
})
export class DailyChallengeComponent {

	steamGames: any;

	constructor(private steamService: SteamService) {}

	ngOnInit()
	{
		this.steamService.getAllGames().subscribe(response => {
			this.steamGames = response;
		});
	}

}
