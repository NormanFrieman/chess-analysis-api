import { ERules, ETimeClass, IGames } from "../domain/models/games";
import { IUserInfoModel } from "../domain/models/userinfo";
import { ILoadMatchesApi } from "../domain/usecases/load-matches-api";
import { ISetMatches } from "../domain/usecases/set-matches";
import { InvalidParamError, MissingParamError } from "../errors";
import { badRequest, internalServerError, notFoundError, ok } from "../helpers/http/http-helper";
import { IHttpRequest, IValidation } from "../protocols"
import { SetMatchesController } from "./set-matches-controller"

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

const makeLoadMatches = (): ILoadMatchesApi => {
    class LoadMatchesApiStub implements ILoadMatchesApi {
        async load(userInfoModel: IUserInfoModel): Promise<IGames> {
            return new Promise(resolve => resolve(makeGames()));
        }
    }

    return new LoadMatchesApiStub();
}

const makeSetMatches = (): ISetMatches => {
    class SetMatchesStub implements ISetMatches {
        async set(games: IGames): Promise<number> {
            return new Promise(resolve => resolve(makeGames().games.length));
        }
    }

    return new SetMatchesStub();
}

const makeFakeInput = (): IHttpRequest => {
    return {
        body: {
            username: 'any username',
            mounth: 12
        }
    };
};

const makeValidation = (): IValidation => {
    class ValidationStub implements IValidation {
        validate(input: any): Error {
            return null;
        }
    }

    return new ValidationStub();
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation();
    const loadMatchesStub = makeLoadMatches();
    const setMatchesStub = makeSetMatches();

    return {
        sut: new SetMatchesController(validationStub, loadMatchesStub, setMatchesStub),
        validation: validationStub,
        loadMatches: loadMatchesStub,
        setMatches: setMatchesStub
    }
}

interface SutTypes {
    sut: SetMatchesController,
    validation: IValidation,
    loadMatches: ILoadMatchesApi,
    setMatches: ISetMatches
}

describe('LoadMatchesController Tests', () => {
    test('Should call validation with correct values', async () => {
        const { sut, validation } = makeSut();

        const validationSpy = jest.spyOn(validation, 'validate');

        const req = makeFakeInput();
        await sut.handle(req);

        expect(validationSpy).toHaveBeenCalledWith(req.body);
    }),
    test('Should return error if validation returns an error', async () => {
        const { sut, validation } = makeSut();

        jest.spyOn(validation, 'validate').mockReturnValueOnce(new MissingParamError('any error'));

        const req = makeFakeInput();
        const res = await sut.handle(req);

        expect(res).toEqual(badRequest(new MissingParamError('any error')));
    }),
    test('Should return 500 if validation throws', async () => {
        const { sut, validation } = makeSut();

        jest.spyOn(validation, 'validate').mockImplementationOnce(() => {
            throw new Error();
        });

        const req = makeFakeInput();
        const res = await sut.handle(req);

        expect(res).toEqual(internalServerError(new Error()));
    }),


    test('Should call loadMatches with correct values', async () => {
        const { sut, loadMatches } = makeSut();

        const loadSpy = jest.spyOn(loadMatches, 'load');

        const req = makeFakeInput();
        await sut.handle(req);

        expect(loadSpy).toHaveBeenCalledWith({
            username: 'any username',
            mounth: 12
        });
    }),
    test('Should return 404 if no match is found', async () => {
        const { sut, loadMatches } = makeSut();

        jest.spyOn(loadMatches, 'load').mockReturnValueOnce(new Promise(resolve => resolve({ games: [] })));

        const req = makeFakeInput();
        const res = await sut.handle(req);

        expect(res).toEqual(notFoundError(new InvalidParamError('username or mounth'))); 
    }),
    test('Should return 500 if loadMatches throws', async () => {
        const { sut, loadMatches } = makeSut();

        jest.spyOn(loadMatches, 'load').mockImplementationOnce(() => {
            throw new Error();
        });

        const req = makeFakeInput();
        const res = await sut.handle(req);

        expect(res).toEqual(internalServerError(new Error()));
    }),


    test('Should call setMatches with correct values', async () => {
        const { sut, setMatches } = makeSut();

        const setSpy = jest.spyOn(setMatches, 'set');

        const req = makeFakeInput();
        await sut.handle(req);

        expect(setSpy).toHaveBeenCalledWith(makeGames());
    }),
    test('Should return 500 if setMatches throws', async () => {
        const { sut, setMatches } = makeSut();

        jest.spyOn(setMatches, 'set').mockImplementationOnce(() => {
            throw new Error();
        });

        const req = makeFakeInput();
        const res = await sut.handle(req);

        expect(res).toEqual(internalServerError(new Error()));
    }),


    test('Should return 200 if sucess', async () => {
        const { sut } = makeSut();

        const req = makeFakeInput();
        const res = await sut.handle(req);

        expect(res).toEqual(ok({
            message: `${makeGames().games.length} saved matches`
        }));
    })
})
