import { Component } from '@angular/core';
import { PatchNote } from 'src/app/interfaces/patch-note';

@Component({
    selector: 'app-patch-notes',
    templateUrl: './patch-notes.component.html',
    styleUrls: ['./patch-notes.component.css'],
    standalone: false
})
export class PatchNotesComponent {

  public patchNotes: PatchNote[] = [

    {
      day: new Date(2023, 3, 23),
      version: 'v1.0-beta.3',
      description: 'In this release we added a new subpage to display player statistics, improved daily challenge design and made some bugfixes.',
      keys: [
        {
          label: 'new',
          text: 'Added player statistics. Player is now able to see history of daily challenge games, total number of players and how many of them guessed the game.'
        },
        {
          label: 'improvement',
          text: 'Updated hint design of the guessed games.'
        },
        {
          label: 'improvement',
          text: 'Text in game genres will always be horizontally centered.'
        },
        {
          label: 'bugfix',
          text: 'Fixed a bug where the daily challenge game could occur 2 times in a row. The dailly challenge will be unique for at least 7 days.'
        },
        {
          label: 'bugfix',
          text: 'Fixed a bug where game statistics would take 2 rows instead of one.'
        },
        {
          label: 'bugfix',
          text: 'Fixed a bug where the tooltip for game genres wouldn\'t be displayed on hover.'
        }
      ]
    },

    {
      day: new Date(2023, 3, 22),
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
          text: 'Improved website loading time by reducing the size of images.'
        },
        {
          label: 'bugfix',
          text: 'Fixed an issue where players that tried to access subpages directly via URL were given a "Not Found" message.'
        },
        {
          label: 'bugfix',
          text: 'Time for the next game is now displayed properly.'
        },
        {
          label: 'bugfix',
          text: 'On mobile devices, the expanding/collapsing navigation bar now works properly.'
        }
      ]
    },

    {
      day: new Date(2023, 3, 20),
      version: 'v1.0-beta.1',
      description: 'This version includes the initial release of the game. Players are able to guess the daily challenge. Game data is stored for upcoming content updates.<br>We welcome your feedback and suggestions.',
      keys: []
    }

  ];

}
