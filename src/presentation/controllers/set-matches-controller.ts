import { ILoadMatchesApi } from "../domain/usecases/load-matches-api";
import { ISetMatches } from "../domain/usecases/set-matches";
import { InvalidParamError } from "../errors";
import { badRequest, internalServerError, notFoundError, ok } from "../helpers/http/http-helper";
import { IController, IHttpRequest, IHttpResponse, IValidation } from "../protocols";

export class SetMatchesController implements IController {
    constructor(
        private validation: IValidation,
        private loadMatches: ILoadMatchesApi,
        private setMatches: ISetMatches
    ) { }
    async handle(httpReq: IHttpRequest): Promise<IHttpResponse> {
        try{
            const validation = this.validation.validate(httpReq.body);
            if(validation !== null){
                return badRequest(validation);
            }

            const { username, mounth } = httpReq.body;

            const loadedMatches = await this.loadMatches.load({
                username,
                mounth
            });
            if(loadedMatches.games.length === 0){
                return notFoundError(new InvalidParamError('username or mounth'));
            }

            const quantMatches = await this.setMatches.set(loadedMatches);
    
            return ok({
                message: `${quantMatches} saved matches`
            });
        }
        catch(err){
            return internalServerError(err);
        }
    }
}
