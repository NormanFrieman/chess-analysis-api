import { ERules, ETimeClass, IGames } from "../../domain/models/games"
import { IUserInfoModel } from "../../domain/models/userinfo"
import { ILoadMatchesRepository } from "../protocols/load-matches-repository";
import { LoadMatches } from "./load-matches"

const makeFakeInput = (): IUserInfoModel => {
    return {
        username: 'any username',
        mounth: 12,
        year: 2021
    };
}

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

const makeLoadMatchesRepository = (): ILoadMatchesRepository => {
    class LoadMatchesRepositoryStub implements ILoadMatchesRepository {
        load(userInfoModel: IUserInfoModel): Promise<IGames> {
            return new Promise(resolve => resolve(makeGames()));
        }
    }

    return new LoadMatchesRepositoryStub();
}

const makeSut = (): SutTypes => {
    const loadMatchesRepositoryStub = makeLoadMatchesRepository();
    return {
        sut: new LoadMatches(loadMatchesRepositoryStub),
        loadMatchesRepository: loadMatchesRepositoryStub
    }
}

interface SutTypes {
    sut: LoadMatches,
    loadMatchesRepository: ILoadMatchesRepository
}

describe('LoadMatches Test', () => {
    test('Should call loadMatchesRepository with correct values', async () => {
        const { sut, loadMatchesRepository } = makeSut();

        const loadMatchesRepositorySpy = jest.spyOn(loadMatchesRepository, 'load');

        const userInfo = makeFakeInput();

        await sut.load(userInfo);

        expect(loadMatchesRepositorySpy).toHaveBeenCalledWith(userInfo);
    }),
    test('Should return matches with sucess', async () => {
        const { sut } = makeSut();

        const userInfo = makeFakeInput();

        const res = await sut.load(userInfo);

        expect(res).toEqual(makeGames());
    }),
    test('Should return error with loadMatchesRepository throws', async () => {
        const { sut, loadMatchesRepository } = makeSut();

        jest.spyOn(loadMatchesRepository, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));

        const userInfo = makeFakeInput();
        const promise = sut.load(userInfo);

        await expect(promise).rejects.toThrow();
    })
})
