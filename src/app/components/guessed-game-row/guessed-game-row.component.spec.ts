import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessedGameRowComponent } from './guessed-game-row.component';

describe('GuessedGameRowComponent', () => {
  let component: GuessedGameRowComponent;
  let fixture: ComponentFixture<GuessedGameRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuessedGameRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuessedGameRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
