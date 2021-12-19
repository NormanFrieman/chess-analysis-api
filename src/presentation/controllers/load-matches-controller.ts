import { IController, IHttpRequest, IHttpResponse } from "../protocols";

export class LoadMatchesController implements IController {
    async handle(httpReq: IHttpRequest): Promise<IHttpResponse> {
        return new Promise(resolve => resolve(null));
    }
}
