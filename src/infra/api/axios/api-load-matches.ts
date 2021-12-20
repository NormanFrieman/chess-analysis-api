import axios from "axios";
import { IGames } from "../../../domain/models/games";
import { IUserInfoModel } from "../../../domain/models/userinfo";
import { ILoadMatches } from "../../../domain/usecases/load-matches";
import { generateGames } from "../../../utils/generate-games";

export class ApiLoadMatches implements ILoadMatches {
    async load(userInfoModel: IUserInfoModel): Promise<IGames> {
        const url = `https://api.chess.com/pub/player/${userInfoModel.username}/games/${userInfoModel.year}/${userInfoModel.mounth}`;

        const response = await axios.get(url);

        const games = generateGames(response.data);
        console.log(games.games.length);
        return games;
    }
}