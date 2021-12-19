import { IGames } from "../models/games";

export interface ISetMatches {
    set(games: IGames): Promise<number>;
}