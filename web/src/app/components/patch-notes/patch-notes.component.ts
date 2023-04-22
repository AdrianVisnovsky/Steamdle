import { Component } from '@angular/core';
import { PatchNote } from 'src/app/interfaces/patch-note';

@Component({
  selector: 'app-patch-notes',
  templateUrl: './patch-notes.component.html',
  styleUrls: ['./patch-notes.component.css']
})
export class PatchNotesComponent {

  public patchNotes: PatchNote[] = [

    {
      day: new Date(2023, 4, 22),
      version: 'v1.0-beta.2',
      description: 'This version includes some UI improvements, bugfixes and improved link sharing.',
      keys: [
        {
          label: 'new',
          text: 'Added og meta tags for better link sharing of steamdle website.'
        },
        {
          label: 'improvement',
          text: 'Updated patch notes page design to support changelog.'
        },
        {
          label: 'improvement',
          text: 'Improved website loading time by reducing size of images.'
        },
        {
          label: 'bugfix',
          text: 'Fixed an issue where players that tried to access subpages directly by URL were given "Not Found" message.'
        },
        {
          label: 'bugfix',
          text: 'Time to next game is now displayed properly.'
        },
        {
          label: 'bugfix',
          text: 'On mobile devices expending/collapsing navigation bar now works properly.'
        }
      ]
    },

    {
      day: new Date(2023, 4, 20),
      version: 'v1.0-beta.1',
      description: 'This version includes initial release of the game. Players are able to guess daily challenge game. Game data is stored for upcomming content updates.<br>We welcome your feedback and suggestions.',
      keys: []
    }

  ];

}
