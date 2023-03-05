import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessedGameComponent } from './guessed-game.component';

describe('GuessedGameComponent', () => {
  let component: GuessedGameComponent;
  let fixture: ComponentFixture<GuessedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessedGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
