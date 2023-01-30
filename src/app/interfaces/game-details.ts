export interface GameDetails {
    appID:                number;
    type:                 string;
    name:                 string;
    is_free:              boolean;
    header_image:         string;
    background:           string;
    requirements:         Requirements;
    developers:           string[];
    publishers:           string[];
    detailed_description: string;
    short_description:    string;
    about_the_game:       string;
    website:              string;
    price_overview:       PriceOverview;
    platforms:            Platforms;
    categories:           Category[];
    genres:               Genre[];
    recommendations:      Recommendations;
    screenshots:          Screenshot[];
    release_date:         ReleaseDate;
    updated_at:           number;
}

export interface Category {
    description: string;
    id:          number;
}

export interface Genre {
    description: string;
    id:          string;
}

export interface Platforms {
    linux:   boolean;
    mac:     boolean;
    windows: boolean;
}

export interface PriceOverview {
    final_formatted:   string;
    initial_formatted: string;
    discount_percent:  number;
    final:             number;
    initial:           number;
    currency:          string;
}

export interface Recommendations {
    total: number;
}

export interface ReleaseDate {
    date:        string;
    coming_soon: boolean;
}

export interface Requirements {
}

export interface Screenshot {
    path_full:      string;
    path_thumbnail: string;
    id:             number;
}
