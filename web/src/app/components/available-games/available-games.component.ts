import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Game } from 'src/app/interfaces/game';

@Component({
	selector: 'app-available-games',
	templateUrl: './available-games.component.html',
	styleUrls: ['./available-games.component.css']
})
export class AvailableGamesComponent {

	public gameNameFormControl: FormControl = new FormControl();
	public filterGameName: string = "";

	public filterScoreMin: number;
	public filterScoreMax: number;
	public filterReleasedYearMin: number;
	public filterReleasedYearMax: number;

	public platformAny: boolean = true;
	public platformWindows: boolean = false;
	public platformMacOs: boolean = false;
	public platformLinux: boolean = false;

	public filteredGames: Game[] = this.myapp.steamGames;

	constructor(public myapp: AppComponent)
	{

		this.filterReleasedYearMin = myapp.minReleasedYear;
		this.filterReleasedYearMax = myapp.maxReleasedYear;

		this.filterScoreMin = myapp.minScore;
		this.filterScoreMax = myapp.maxScore;

		this.gameNameFormControl.valueChanges.subscribe((value: string) => {
			this.filterGameName = value.toLowerCase();
			this.FilterGames();
		});

	}

	public FilterGames()
	{

		const start = new Date().getTime();

		this.filteredGames = 
			this.myapp.steamGames.filter(
				options =>
					(this.filterGameName == '' || options.name.toLowerCase().includes(this.filterGameName))
					&& options.released >= this.filterReleasedYearMin
					&& options.released <= this.filterReleasedYearMax
					&& options.score >= this.filterScoreMin
					&& options.score <= this.filterScoreMax
					&& (this.platformAny || this.isGameSuitable(options))
			).sort(this.myapp.compareGames);

		const end = new Date().getTime();
		let elapsed = end - start;

	}

	public isGameSuitable(game: Game): boolean
	{

		if(this.platformWindows == false && this.platformMacOs == false && this.platformLinux == false)
			return false;

		if((this.platformWindows && game.platforms.indexOf('WIN') == -1) || (!this.platformWindows && game.platforms.indexOf('WIN') > -1))
			return false;

		if((this.platformMacOs && game.platforms.indexOf('MAC') == -1) || (!this.platformMacOs && game.platforms.indexOf('MAC') > -1))
			return false;

		if((this.platformLinux && game.platforms.indexOf('LNX') == -1) || (!this.platformLinux && game.platforms.indexOf('LNX') > -1))
			return false;

		return true;
	}

	public scoreMinChanged(minScore: number)
	{
		this.filterScoreMin = minScore;
		this.FilterGames();
	}

	public scoreMaxChanged(maxScore: number)
	{
		this.filterScoreMax = maxScore;
		this.FilterGames();
	}

	public releasedYearMinChanged(minReleasedYear: number)
	{
		this.filterReleasedYearMin = minReleasedYear;
		this.FilterGames();
	}

	public releasedYearMaxChanged(maxReleasedYear: number)
	{
		this.filterReleasedYearMax = maxReleasedYear;
		this.FilterGames();
	}

	public platformAnyChanged(anyPlatform: boolean)
	{
		this.platformAny = anyPlatform;
		this.FilterGames();
	}

	public platformWindowsChanged(windowsPlatform: boolean)
	{
		this.platformWindows = windowsPlatform;
		this.FilterGames();
	}

	public platformMacOsChanged(macOsPlatform: boolean)
	{
		this.platformMacOs = macOsPlatform;
		this.FilterGames();
	}

	public platformLinuxChanged(linuxPlatform: boolean)
	{
		this.platformLinux = linuxPlatform;
		this.FilterGames();
	}

	public GetGameScoreRange(): string
	{

		if(this.filterScoreMin === this.filterScoreMax)
			return this.filterScoreMin.toString();


		return this.filterScoreMin.toString() + ' - ' + this.filterScoreMax.toString();
	}

	public GetReleaseYear(): string
	{
		
		if(this.filterReleasedYearMin === this.filterReleasedYearMax)
			return this.filterReleasedYearMin.toString();


		return this.filterReleasedYearMin.toString() + ' - ' + this.filterReleasedYearMax.toString();
	}

	public GetPlatforms(): string
	{
		
		if(!this.platformAny && !this.platformWindows && !this.platformMacOs && !this.platformLinux)
			return "none";

		if(this.platformAny)
			return "any";

		let platforms: string[] = [];

		if(this.platformWindows)
			platforms.push("Windows");

		if(this.platformMacOs)
			platforms.push("Mac Os");

		if(this.platformLinux)
			platforms.push("Linux");

		return platforms.join(", ");
	}

}
