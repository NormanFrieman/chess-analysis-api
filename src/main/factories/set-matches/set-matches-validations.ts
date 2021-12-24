import { RequiredFieldsValidation, ValidationComposite } from "../../../presentation/helpers/validators";
import { IValidation } from "../../../presentation/protocols";

export const makeSetMatchesValidation = (): IValidation => {
    const validations: IValidation[] = [];

    const fields = ['username', 'mounth', 'year'];
    const requiredFieldsValidation = new RequiredFieldsValidation(fields);
    validations.push(requiredFieldsValidation);

    const validation = new ValidationComposite(validations);
    return validation;
}