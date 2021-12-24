import { IReturnSetMatches } from "../../domain/models/return-set-matches";
import { ISetMatches, ISetMatchesModel } from "../../domain/usecases/set-matches";
import { ISetMatchesRepository } from "../protocols/set-matches-repository";

export class DbSetMatches implements ISetMatches {
    constructor(
        private setMatchesRepository: ISetMatchesRepository
    ) { }
    async set(model: ISetMatchesModel): Promise<IReturnSetMatches> {
        const res = await this.setMatchesRepository.set(model);
        return res;
    }
}
