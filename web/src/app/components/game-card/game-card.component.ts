import { Component, Input } from '@angular/core';
import { Game } from 'src/app/interfaces/game';

@Component({
	selector: 'app-game-card',
	templateUrl: './game-card.component.html',
	styleUrls: ['./game-card.component.css']
})
export class GameCardComponent {

	@Input() game!: Game;

	public IsGameOnWindows(): boolean {
		return this.game.platforms.indexOf("WIN") > -1;
	}

	public IsGameOnMacOs(): boolean {
		return this.game.platforms.indexOf("MAC") > -1;
	}

	public IsGameOnLinux(): boolean {
		return this.game.platforms.indexOf("LNX") > -1;
	}

}
