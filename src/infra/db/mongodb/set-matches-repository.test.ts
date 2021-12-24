import { Collection } from "mongodb";
import { ERules, ETimeClass, IGames } from "../../../domain/models/games";
import { MongoHelper } from "./mongo-helper"
import { SetMatchesRepository } from "./set-matches-repository";

const makeSut = (): SutTypes => {
    return {
        sut: new SetMatchesRepository('Loaded_Matches_Test')
    }
};

const makeGames = (): IGames => {
    return {
        games: [
            {
                uuid: 'any uuid',
                pgn: 'any pgn',
                time_class: ETimeClass.blitz,
                rules: ERules.chess,
                rated: true,
                url: new URL('https://www.anyurl.com')
            },
            {
                uuid: 'any uuid 2',
                pgn: 'any pgn 2',
                time_class: ETimeClass.rapid,
                rules: ERules.chess,
                rated: true,
                url: new URL('https://www.anyurl.com')
            }
        ]
    }
}

interface SutTypes {
    sut: SetMatchesRepository
}

const deleteData = async (collection: Collection): Promise<void> => {
    await collection.deleteMany({});
    return;
}

let matchesCollection: Collection;
describe('SetMatchesRepository Test', () => {
    beforeAll(async () => {
        const dotenv = (await import('dotenv')).default;
        
        dotenv.config();
        await MongoHelper.connect(process.env.MONGO_URL)
    }),
    afterAll(async () => {
        await deleteData(matchesCollection);
        await MongoHelper.disconnect();
    }),
    beforeEach(async () => {
        matchesCollection = MongoHelper.getCollection('Loaded_Matches');
        await deleteData(matchesCollection);
    }),

    test('Should return the number of saved matches if success', async () => {
        const { sut } = makeSut();

        const res = await sut.set({
            games: makeGames(),
            mounth: 12,
            year: 2021
        });

        expect(res.quant).toBe(2);
    })
})