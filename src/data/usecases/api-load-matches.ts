import { IGames } from "../../domain/models/games";
import { IUserInfoModel } from "../../domain/models/userinfo";
import { ILoadMatches } from "../../domain/usecases/load-matches";
import { ILoadMatchesRepository } from "../protocols/load-matches-repository";

export class ApiLoadMatches implements ILoadMatches {
    constructor(
        private loadMatchesRepository: ILoadMatchesRepository
    ) { }
    load(userInfoModel: IUserInfoModel): Promise<IGames> {
        const matches = this.loadMatchesRepository.load(userInfoModel);
        return matches;
    }
}
