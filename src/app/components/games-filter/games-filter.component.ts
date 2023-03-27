import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Game } from 'src/app/interfaces/game';

@Component({
  selector: 'app-games-filter',
  templateUrl: './games-filter.component.html',
  styleUrls: ['./games-filter.component.css']
})
export class GamesFilterComponent {

	public gameNameFormControl: FormControl = new FormControl();
	public filterGameName: string = "";

	public scoreMinFormControl: FormControl = new FormControl(this.myapp.minScore);
	public filterScoreMin: number;

	public scoreMaxFormControl: FormControl = new FormControl(this.myapp.maxScore);
	public filterScoreMax: number;

	public ownersMinFormControl: FormControl = new FormControl(this.myapp.minOwners);
	public filterGameOwnersMin: number;

	public ownersMaxFormControl: FormControl = new FormControl(this.myapp.maxOwners);
	public filterGameOwnersMax: number;

	public releasedYearMinFormControl: FormControl = new FormControl(this.myapp.minReleasedYear);
	public filterReleasedYearMin: number;

	public releasedYearMaxFormControl: FormControl = new FormControl(this.myapp.maxReleasedYear);
	public filterReleasedYearMax: number;

	public filteredGames: Game[] = this.myapp.steamGames;

	constructor(public myapp: AppComponent)
	{

		this.filterReleasedYearMin = myapp.minReleasedYear;
		this.filterReleasedYearMax = myapp.maxReleasedYear;

		this.filterScoreMin = myapp.minScore;
		this.filterScoreMax = myapp.maxScore;

		this.filterGameOwnersMin = myapp.minOwners;
		this.filterGameOwnersMax = myapp.maxOwners;

		this.gameNameFormControl.valueChanges.subscribe((value: string) => {
			this.filterGameName = value.toLowerCase();
			this.FilterGames();
		});

		this.releasedYearMinFormControl.valueChanges.subscribe((value: number) => {
			this.filterReleasedYearMin = value;
			this.FilterGames();
		});

		this.releasedYearMaxFormControl.valueChanges.subscribe((value: number) => {
			this.filterReleasedYearMax = value;
			this.FilterGames();
		});

		this.scoreMinFormControl.valueChanges.subscribe((value: number) => {
			this.filterScoreMin = value;
			this.FilterGames();
		});

		this.scoreMaxFormControl.valueChanges.subscribe((value: number) => {
			this.filterScoreMax = value;
			this.FilterGames();
		});

		this.ownersMinFormControl.valueChanges.subscribe((value: number) => {
			this.filterGameOwnersMin = value;
			this.FilterGames();
		});

		this.ownersMaxFormControl.valueChanges.subscribe((value: number) => {
			this.filterGameOwnersMax = value;
			this.FilterGames();
		});

	}

	public FilterGames()
	{

		this.filteredGames = 
			this.myapp.steamGames.filter(
				options => options.name.toLowerCase().includes(this.filterGameName)
					&& options.released >= this.filterReleasedYearMin
					&& options.released <= this.filterReleasedYearMax
					&& options.score >= this.filterScoreMin
					&& options.score <= this.filterScoreMax
					&& options.owners >= this.filterGameOwnersMin
					&& options.owners <= this.filterGameOwnersMax
			).sort(this.myapp.compareGames);

	}

}
