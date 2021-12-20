import { IGames } from "../../domain/models/games";

export interface ISetMatchesRepository {
    set(games: IGames): Promise<number>
}
