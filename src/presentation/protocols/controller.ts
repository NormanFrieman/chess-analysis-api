import { IHttpRequest, IHttpResponse } from "./http";

export interface IController {
    handle(httpReq: IHttpRequest): Promise<IHttpResponse>;
}
