import { Game } from "./game";

export interface GameData {

    streak:             number;
    GameDailyChallenge: GameDailyChallenge[];

}

export interface GameDailyChallenge {

    AppId:              number;
    Day:                Date;
    Guessed:            boolean;
    GuessedGameIds:     number[];
    Order:              number;

}