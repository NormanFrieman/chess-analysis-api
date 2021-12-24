import { ISetMatchesRepository } from "../../../data/protocols/set-matches-repository";
import { IReturnSetMatches } from "../../../domain/models/return-set-matches";
import { ISetMatchesModel } from "../../../domain/usecases/set-matches";
import { MongoHelper } from "./mongo-helper";

export class SetMatchesRepository implements ISetMatchesRepository {
    constructor(
        private readonly collectionName: string
    ) { }
    async set(model: ISetMatchesModel): Promise<IReturnSetMatches> {
        const matchesCollection = MongoHelper.getCollection(this.collectionName);

        const result = await matchesCollection.insertOne(model);

        if(result === null)
            return null;
        
        return {
            id: result.insertedId.toString(),
            quant: model.games.games.length
        };
    }
}