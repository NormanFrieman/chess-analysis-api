import { MissingParamError } from "../../errors";
import { IValidation } from "../../protocols";

export class RequiredFieldsValidation implements IValidation {
    constructor(
        private readonly fields: string[]
    ) { }
    validate(input: {[x: string]: string}): Error {
        if(!input || Object.keys(input).length === 0){
            return new MissingParamError('body');
        }
        for(const field of this.fields){
            if(!input[field]){
                return new MissingParamError(field);
            }
        }
    
        return null;
    }
}