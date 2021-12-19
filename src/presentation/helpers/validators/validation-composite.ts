import { IValidation } from "../../protocols";

export class ValidationComposite implements IValidation {
    constructor(
        private readonly validations: IValidation[]
    ) { };
    validate(input: {[x: string]: string}): Error {
        for(const validation of this.validations){
            const error = validation.validate(input);
            if(error !== null){
                return error;
            }
        }

        return null;
    }
}