import { MissingParamError } from "../errors";
import { badRequest, internalServerError } from "../helpers/http/http-helper";
import { IHttpRequest, IValidation } from "../protocols"
import { LoadMatchesController } from "./load-matches-controller"

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

    return {
        sut: new LoadMatchesController(validationStub),
        validation: validationStub
    }
}

interface SutTypes {
    sut: LoadMatchesController,
    validation: IValidation
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
    })
})
