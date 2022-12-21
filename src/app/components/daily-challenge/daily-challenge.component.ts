import { SteamApp } from './../../interfaces/steam-app';
import { SteamService } from './../../services/steam.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-daily-challenge',
	templateUrl: './daily-challenge.component.html',
	styleUrls: ['./daily-challenge.component.css']
})
export class DailyChallengeComponent implements OnInit {

	steamGames!: SteamApp[];

	gameToGuess!: SteamApp;

	constructor(private steamService: SteamService) {}

	ngOnInit()
	{
		this.steamService.getAllGames().subscribe(data => {

			// store all available games
			this.steamGames = data.applist.apps;

			// pick one random game
			let randomIndex: number = Math.floor(Math.random() * this.steamGames.length);

			this.gameToGuess = this.steamGames[randomIndex];

		});
	}

}
