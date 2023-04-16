import { DailyChallengeComponent } from './../daily-challenge/daily-challenge.component';
import { Component, Input } from '@angular/core';
import { Game } from 'src/app/interfaces/game';

export enum EHintType {
	None,
	Partial,
	Match,
	Lower,
	Higher
}

@Component({
  selector: 'app-guessed-game-row',
  templateUrl: './guessed-game-row.component.html',
  styleUrls: ['./guessed-game-row.component.css']
})
export class GuessedGameRowComponent {


	@Input() gameId!: number;

	game!: Game;

	releasedHint: EHintType = EHintType.None;
	scoreHint: EHintType = EHintType.None;
	ownersHint: EHintType = EHintType.None
	genresHint: EHintType = EHintType.None;
	platformsHint: EHintType = EHintType.None;

	constructor(public mydailychallenge: DailyChallengeComponent) {}

	async ngOnInit() {

		await this.mydailychallenge.myapp.gameService.dataLoaded;

		this.game = this.mydailychallenge.myapp.steamGames.filter((g) => g.id === this.gameId).at(0)!;

		// released
		if(this.game.released < this.mydailychallenge.gameToGuess.released)
			this.releasedHint = EHintType.Higher;
		else if(this.game.released > this.mydailychallenge.gameToGuess.released)
			this.releasedHint = EHintType.Lower;
		else
			this.releasedHint = EHintType.Match;

		// score
		if(this.game.score < this.mydailychallenge.gameToGuess.score)
			this.scoreHint = EHintType.Higher;
		else if(this.game.score > this.mydailychallenge.gameToGuess.score)
			this.scoreHint = EHintType.Lower;
		else
			this.scoreHint = EHintType.Match;

		// owners
		if(this.game.owners < this.mydailychallenge.gameToGuess.owners)
			this.ownersHint = EHintType.Higher;
		else if(this.game.owners > this.mydailychallenge.gameToGuess.owners)
			this.ownersHint = EHintType.Lower;
		else
			this.ownersHint = EHintType.Match;

		// genres
		if(this.arraysSame(this.game.genres, this.mydailychallenge.gameToGuess.genres))
			this.genresHint = EHintType.Match;
		else if(this.arraysPartialySame(this.game.genres, this.mydailychallenge.gameToGuess.genres))
			this.genresHint = EHintType.Partial;
		else
			this.genresHint = EHintType.None;

		// platforms
		if(this.arraysSame(this.game.platforms, this.mydailychallenge.gameToGuess.platforms))
			this.platformsHint = EHintType.Match;
		else if(this.arraysPartialySame(this.game.platforms, this.mydailychallenge.gameToGuess.platforms))
			this.platformsHint = EHintType.Partial;
		else
			this.platformsHint = EHintType.None;

	}

	private arraysSame(arr1: string[], arr2: string[]): boolean {

		const arr1u = [...new Set(arr1).values()]; // unique values of xs
		const arr2u = [...new Set(arr2).values()]; // unique values of ys
		return arr1u.length != arr2u.length ? false : arr1u.every(x => arr2u.includes(x));

	}

	private arraysPartialySame(arr1: string[], arr2: string[]): boolean
	{

		for(let entry of arr1) {
			if(arr2.includes(entry)) {
				return true;
			}
		}

		
		return false;
	}

	public PrintGameGenres(genres: string[]): string {

		if(genres.length <= 3)
			return genres.join(', <br>');

		let innerHtml: string = genres.slice(0, 2).join(', <br>') + ' <br> + ' + (genres.length - 2).toString() + ' more...';
		innerHtml +=
			`<span class="absolute hidden group-hover:flex -left-14 -top-2 -translate-y-full w-48 px-2 py-1 bg-gray-700 rounded-lg text-center text-white text-sm after:content-[\'\']
			after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-gray-700">
			` + this.GetGenresTooltip(genres) + `
			</span>`;

		return innerHtml;
	}

	public GetGenresTooltip(genres: string[]): string {
		return genres.join(', ');
	}

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
