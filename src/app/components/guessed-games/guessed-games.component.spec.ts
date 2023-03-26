import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessedGamesComponent } from './guessed-games.component';

describe('GuessedGamesComponent', () => {
  let component: GuessedGamesComponent;
  let fixture: ComponentFixture<GuessedGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessedGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessedGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
