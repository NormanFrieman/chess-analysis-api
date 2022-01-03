import { Collection } from 'mongodb';
import request from 'supertest';
import { ERules, ETimeClass, IGames } from '../../domain/models/games';
import { MongoHelper } from '../../infra/db/mongodb/mongo-helper';
import app from '../config/app';

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

const deleteData = async (collection: Collection): Promise<void> => {
    await collection.deleteMany({});
    return;
}

let matchesCollection: Collection;
describe('SetMatches Routes', () => {
    beforeAll(async () => {
        const dotenv = (await import('dotenv')).default;
        
        dotenv.config();
        await MongoHelper.connect(process.env.MONGO_URL);
        MongoHelper.setLoadedMatchesCollection('Loaded_Matches_Test');
    }),
    afterAll(async () => {
        await deleteData(matchesCollection);
        await MongoHelper.disconnect();
    }),
    beforeEach(async () => {
        matchesCollection = MongoHelper.getLoadedMatchesCollection();
        await deleteData(matchesCollection);
    }),

    test('Garantir que retorne o usuário caso seja sucesso', async () => {
        await request(app)
            .post('/api/matches')
            .send({
                username: 'NormanFrieman',
                mounth: 12,
                year: 2021
            })
            .expect(200);
    })
});