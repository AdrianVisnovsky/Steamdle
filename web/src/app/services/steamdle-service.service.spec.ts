import { TestBed } from '@angular/core/testing';

import { SteamdleService } from './steamdle-service.service';

describe('SteamdleService', () => {
  let service: SteamdleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteamdleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
