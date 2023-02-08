import { SteamApp } from './../../interfaces/steam-app';
import { Component, OnInit } from '@angular/core';
import GamesDataJson from '../../../assets/gameData.json';
import { Game } from 'src/app/interfaces/game';

@Component({
	selector: 'app-daily-challenge',
	templateUrl: './daily-challenge.component.html',
	styleUrls: ['./daily-challenge.component.css']
})
export class DailyChallengeComponent implements OnInit {

	steamGames: Game[];
	gameToGuess: Game;
	guessedGames: Game[] = [];

	constructor() {

		this.steamGames = GamesDataJson;
		
		// pick one random game
		let randomIndex: number = Math.floor(Math.random() * this.steamGames.length);

		this.gameToGuess = this.steamGames[randomIndex];

	}

	ngOnInit()
	{

		console.log(this.steamGames);

	}

	gameSelected(event: unknown)
	{
		console.log(event);
	}

}
