import { Request, RequestHandler, Response } from "express";
import { IController, IHttpRequest } from "../../presentation/protocols";

export const adaptRoute = (controller: IController): RequestHandler => {
    return async (req: Request, res: Response): Promise<void> => {
        const httpRequest: IHttpRequest = {
            body: req.body as {[x: string]: string},
            params: req.params as {[x: string]: string}
        };
        const httpResponse = await controller.handle(httpRequest);
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
}