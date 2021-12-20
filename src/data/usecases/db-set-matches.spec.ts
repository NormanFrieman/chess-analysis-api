import { ERules, ETimeClass, IGames } from "../../domain/models/games";
import { ISetMatchesRepository } from "../protocols/set-matches-repository";
import { DbSetMatches } from "./db-set-matches";

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

const makeSetMatchesRepository = (): ISetMatchesRepository => {
    class SetMatchesRepositoryStub implements ISetMatchesRepository {
        set(games: IGames): Promise<number> {
            return new Promise(resolve => resolve(makeGames().games.length));
        }
    }

    return new SetMatchesRepositoryStub();
}

const makeSut = (): SutTypes => {
    const loadMatchesRepositoryStub = makeSetMatchesRepository();
    return {
        sut: new DbSetMatches(loadMatchesRepositoryStub),
        loadMatchesRepository: loadMatchesRepositoryStub
    }
}

interface SutTypes {
    sut: DbSetMatches,
    loadMatchesRepository: ISetMatchesRepository
}

describe('DbSetMatches Test', () => {
    test('Should call loadMatchesRepository with correct values', async () => {
        const { sut, loadMatchesRepository } = makeSut();

        const loadMatchesRepositorySpy = jest.spyOn(loadMatchesRepository, 'set');

        const input = makeGames();

        await sut.set(input);

        expect(loadMatchesRepositorySpy).toHaveBeenCalledWith(input);
    }),
    test('Should return matches with sucess', async () => {
        const { sut } = makeSut();

        const input = makeGames();

        const res = await sut.set(input);

        expect(res).toEqual(input.games.length);
    }),
    test('Should return error with loadMatchesRepository throws', async () => {
        const { sut, loadMatchesRepository } = makeSut();

        jest.spyOn(loadMatchesRepository, 'set').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));

        const input = makeGames();
        const promise = sut.set(input);

        await expect(promise).rejects.toThrow();
    })
})
