export interface Game {
    id:           number;
    name:         string;
    score:        number;
    released:     number;
    img:          string;
    platforms:    string[];
    genres:       string[];
    achievements: number;
    owners:       number;
}
