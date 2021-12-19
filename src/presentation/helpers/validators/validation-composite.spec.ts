import { ValidationComposite } from "./validation-composite"
import { InvalidParamError, MissingParamError } from "../../errors";
import { IValidation } from "../../protocols";

const makeValidation = (): IValidation => {
    class Validation implements IValidation {
        validate(input: { [x: string]: string; }): Error {
            return null;
        }
    }

    return new Validation();
}

const makeSut = (): SutTypes => {
    const validationStub = [makeValidation(), makeValidation()];
    return {
        sut: new ValidationComposite(validationStub),
        validation: validationStub
    };
}

interface SutTypes {
    sut: ValidationComposite;
    validation: IValidation[];
}

const makeFakeInput = (): {[x: string]: string} => {
    return {
        anyField: 'any value',
        anotherField: 'any value'
    };
}

describe('ValidationComposite Test', () => {
    test('Garantir que retorne erro se alguma validação falhar', () => {
        const { sut, validation } = makeSut();
        const fakeInput = makeFakeInput();

        jest.spyOn(validation[0], 'validate').mockReturnValueOnce(new InvalidParamError('error'));

        const erro = sut.validate(fakeInput);

        expect(erro).toEqual(new InvalidParamError('error'));
    }),
    test('Garantir que retorne erro da primeira validação que falhar', () => {
        const { sut, validation } = makeSut();
        const fakeInput = makeFakeInput();

        jest.spyOn(validation[0], 'validate').mockReturnValueOnce(new MissingParamError('error'));
        jest.spyOn(validation[1], 'validate').mockReturnValueOnce(new InvalidParamError('error'));

        const erro = sut.validate(fakeInput);

        expect(erro).toEqual(new MissingParamError('error'));
    }),
    test('Garantir que retorne nulo caso não ocorra erro', () => {
        const { sut } = makeSut();
        const fakeInput = makeFakeInput();

        const erro = sut.validate(fakeInput);

        expect(erro).toBeNull();
    })
})