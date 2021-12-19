import { RequiredFieldsValidation } from "./required-fields-validation";
import { MissingParamError } from "../../errors";

const makeSut = (): RequiredFieldsValidation => {
    return new RequiredFieldsValidation(['fieldOne', 'fieldTwo']);
}

const makeFakeInput = (): {[x: string]: string} => {
    return {
        fieldOne: 'any value',
        fieldTwo: 'another value'
    };
}

describe('RequiredFieldsValidation Test', () => {
    test('Garantir que erro retornado seja MissingParamError', () => {
        const sut = makeSut();
        const fakeInput = {
            fieldOne: 'any value'
        };

        const erro = sut.validate(fakeInput);

        expect(erro).toEqual(new MissingParamError('fieldTwo'));
    }),
    test('Garantir que retorne nulo caso não ocorra erro', () => {
        const sut = makeSut();
        const fakeInput = makeFakeInput();

        const erro = sut.validate(fakeInput);

        expect(erro).toBeNull();
    })
})