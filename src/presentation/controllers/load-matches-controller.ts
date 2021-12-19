import { ILoadMatchesApi } from "../domain/usecases/load-matches-api";
import { InvalidParamError } from "../errors";
import { badRequest, internalServerError, notFoundError } from "../helpers/http/http-helper";
import { IController, IHttpRequest, IHttpResponse, IValidation } from "../protocols";

export class LoadMatchesController implements IController {
    constructor(
        private validation: IValidation,
        private loadMatches: ILoadMatchesApi
    ) { }
    async handle(httpReq: IHttpRequest): Promise<IHttpResponse> {
        try{
            const validation = this.validation.validate(httpReq.body);
            if(validation !== null){
                return badRequest(validation);
            }

            const { username, mounth} = httpReq.body;

            const loadedMatches = await this.loadMatches.load({
                username,
                mounth
            });
            if(loadedMatches.games.length === 0){
                return notFoundError(new InvalidParamError('username or mounth'));
            }
    
            return new Promise(resolve => resolve(null));
        }
        catch(err){
            return internalServerError(err);
        }
    }
}
