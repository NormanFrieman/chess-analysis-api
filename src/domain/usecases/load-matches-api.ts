import { IGames } from "../models/games";
import { IUserInfoModel } from "../models/userinfo";

export interface ILoadMatchesApi {
    load(userInfoModel: IUserInfoModel): Promise<IGames>;
}