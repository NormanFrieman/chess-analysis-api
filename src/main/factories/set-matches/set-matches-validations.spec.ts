import { RequiredFieldsValidation, ValidationComposite } from "../../../presentation/helpers/validators";
import { IValidation } from "../../../presentation/protocols";
import { makeSetMatchesValidation } from "./set-matches-validations";

jest.mock('../../../presentation/helpers/validators/validation-composite');

const makeRequiredFieldsValidation = (): IValidation => {
    const fields = ['games', 'mounth', 'year'];
    return new RequiredFieldsValidation(fields);
}

describe('SetMatchesValidation Factory', () => {
    test('Garantir que ValidationComposite é chamado com validations', () => {
        const validations: IValidation[] = [];
        makeSetMatchesValidation();

        const requiredFields = makeRequiredFieldsValidation();
        validations.push(requiredFields);
        
        expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
    })
})