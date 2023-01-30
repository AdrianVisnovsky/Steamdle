export interface Game {
    id:           number;
    name:         string;
    score:        number;
    released:     string;
    img:          string;
    desc:         string;
    developers:   string[];
    platforms:    string[];
    publishers:   string[];
    genres:       string[];
    categories:   string[];
    tags:         string[];
    achievements: number;
    owners:       number;
    difficulty:   string;
}
