import { IGames } from "../models/games";
import { IReturnSetMatches } from "../models/return-set-matches";

export interface ISetMatches {
    set(model: ISetMatchesModel): Promise<IReturnSetMatches>;
}

export interface ISetMatchesModel {
    games: IGames;
    mounth: number;
    year: number;
}