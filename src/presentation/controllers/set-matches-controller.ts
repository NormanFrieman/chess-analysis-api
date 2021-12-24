import { ILoadMatches } from "../../domain/usecases/load-matches";
import { ISetMatches } from "../../domain/usecases/set-matches";
import { InvalidParamError } from "../errors";
import { badRequest, internalServerError, notFoundError, ok } from "../helpers/http/http-helper";
import { IController, IHttpRequest, IHttpResponse, IValidation } from "../protocols";

export class SetMatchesController implements IController {
    constructor(
        private validation: IValidation,
        private loadMatches: ILoadMatches,
        private setMatches: ISetMatches
    ) { }
    async handle(httpReq: IHttpRequest): Promise<IHttpResponse> {
        try{
            const validation = this.validation.validate(httpReq.body);
            if(validation !== null){
                return badRequest(validation);
            }

            const { username, mounth, year } = httpReq.body;

            const loadedMatches = await this.loadMatches.load({
                username,
                mounth,
                year
            });
            if(loadedMatches.games.length === 0){
                return notFoundError(new InvalidParamError('username or mounth'));
            }

            const res = await this.setMatches.set({
                games: loadedMatches,
                mounth,
                year
            });
    
            return ok({
                message: `${res.quant} saved matches`,
                body: res
            });
        }
        catch(err){
            return internalServerError(err);
        }
    }
}
