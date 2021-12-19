export interface IGames {
    games: IGame[];
}

export interface IGame {
    uuid: string;
    pgn: string;
    time_class: ETimeClass;
    rules: ERules;
    rated: boolean;
    url: URL
}

export enum ETimeClass {
    blitz = "Blitz",
    rapid = "Rapid",
    bullet = "Bullet",
    daily = "Daily"
}

export enum ERules {
    chess = "Normal Chess"
}