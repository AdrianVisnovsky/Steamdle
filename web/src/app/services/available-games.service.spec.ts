import { TestBed } from '@angular/core/testing';

import { AvailableGamesService } from './available-games.service';

describe('AvailableGamesService', () => {
  let service: AvailableGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
