import { IGames } from "../../domain/models/games";
import { IUserInfoModel } from "../../domain/models/userinfo";

export interface ILoadMatchesRepository {
    load(userInfoModel: IUserInfoModel): Promise<IGames>
}
