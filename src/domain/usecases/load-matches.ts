import { IGames } from "../models/games";
import { IUserInfoModel } from "../models/userinfo";

export interface ILoadMatches {
    load(userInfoModel: IUserInfoModel): Promise<IGames>;
}