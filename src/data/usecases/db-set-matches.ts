import { IGames } from "../../domain/models/games";
import { ISetMatches } from "../../domain/usecases/set-matches";
import { ISetMatchesRepository } from "../protocols/set-matches-repository";

export class DbSetMatches implements ISetMatches {
    constructor(
        private setMatchesRepository: ISetMatchesRepository
    ) { }
    async set(games: IGames): Promise<number> {
        const res = await this.setMatchesRepository.set(games);
        return res;
    }
}
