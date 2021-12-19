import { badRequest, internalServerError } from "../helpers/http/http-helper";
import { IController, IHttpRequest, IHttpResponse, IValidation } from "../protocols";

export class LoadMatchesController implements IController {
    constructor(
        private validation: IValidation
    ) { }
    async handle(httpReq: IHttpRequest): Promise<IHttpResponse> {
        try{
            const validation = this.validation.validate(httpReq.body);
            if(validation !== null){
                return badRequest(validation);
            }
    
            return new Promise(resolve => resolve(null));
        }
        catch(err){
            return internalServerError(err);
        }
    }
}
