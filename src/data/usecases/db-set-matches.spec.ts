import { ERules, ETimeClass, IGames } from "../../domain/models/games";
import { IReturnSetMatches } from "../../domain/models/return-set-matches";
import { ISetMatchesModel } from "../../domain/usecases/set-matches";
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
        set(model: ISetMatchesModel): Promise<IReturnSetMatches> {
            return new Promise(resolve => resolve({
                id: 'any_id',
                quant: makeGames().games.length
            }));
        }
    }

    return new SetMatchesRepositoryStub();
}

const makeSut = (): SutTypes => {
    const setMatchesRepositoryStub = makeSetMatchesRepository();
    return {
        sut: new DbSetMatches(setMatchesRepositoryStub),
        setMatchesRepository: setMatchesRepositoryStub
    }
}

interface SutTypes {
    sut: DbSetMatches,
    setMatchesRepository: ISetMatchesRepository
}

describe('DbSetMatches Test', () => {
    test('Should call setMatchesRepository with correct values', async () => {
        const { sut, setMatchesRepository } = makeSut();

        const setMatchesRepositorySpy = jest.spyOn(setMatchesRepository, 'set');

        const input = makeGames();

        await sut.set({
            games: input,
            mounth: 12,
            year: 2021
        });

        expect(setMatchesRepositorySpy).toHaveBeenCalledWith({
            games: input,
            mounth: 12,
            year: 2021
        });
    }),
    test('Should return matches with sucess', async () => {
        const { sut } = makeSut();

        const input = makeGames();

        const res = await sut.set({
            games: input,
            mounth: 12,
            year: 2021
        });

        expect(res).toEqual({
            id: 'any_id',
            quant: input.games.length
        });
    }),
    test('Should return error with setMatchesRepository throws', async () => {
        const { sut, setMatchesRepository } = makeSut();

        jest.spyOn(setMatchesRepository, 'set').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));

        const input = makeGames();
        const promise = sut.set({
            games: input,
            mounth: 12,
            year: 2021
        });

        await expect(promise).rejects.toThrow();
    })
})
