import { ServerError, UnauthorizedError } from "../../errors";
import { IHttpResponse } from "../../protocols/http";
import { IReturnError } from "../../protocols/return-error";

export function badRequest(error: Error): IHttpResponse {
    return {
        statusCode: 400,
        body: returnError(error)
    }
}

export function unauthorized(): IHttpResponse {
    return {
        statusCode: 401,
        body: new UnauthorizedError()
    }
}

export function notFoundError(error: Error): IHttpResponse {
    return {
        statusCode: 404,
        body: returnError(error)
    }
}

export function internalServerError(error: Error): IHttpResponse {
    return {
        statusCode: 500,
        body: new ServerError(error.stack)
    }
}

export function ok(data: {[x: string]: any}): IHttpResponse {
    return {
        statusCode: 200,
        body: data
    }
}

function returnError(error: Error): IReturnError{
    return {
        name: error.name,
        message: error.message
    }
}