import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { AvailableGamesService } from 'src/app/services/available-games.service';

@Component({
	selector: 'app-available-games',
	templateUrl: './available-games.component.html',
	styleUrls: ['./available-games.component.css']
})
export class AvailableGamesComponent {

	constructor(public myapp: AppComponent, public avalService: AvailableGamesService) {
		avalService.initService(myapp)
	}

}
