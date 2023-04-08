import { GameState } from "../enums/game-state";

export interface GameData {

    streak:             number;
    GameDailyChallenge: GameDailyChallenge[];

}

export interface GameDailyChallenge {

    AppId:              number;
    Day:                Date;
    GameState:          GameState;
    GuessedGameIds:     number[];
    Order:              number;

}
