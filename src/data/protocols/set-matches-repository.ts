import { IReturnSetMatches } from "../../domain/models/return-set-matches";
import { ISetMatchesModel } from "../../domain/usecases/set-matches";

export interface ISetMatchesRepository {
    set(model: ISetMatchesModel): Promise<IReturnSetMatches>
}