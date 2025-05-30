import { Request, Response, NextFunction } from "express"
import { BaseError } from "../helpers/error"
import CustomResponse from "../helpers/response"
import statusCode from "../helpers/status_codes"

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof BaseError) {
        CustomResponse.failure(res, err.status, err.message);
    } else {
        CustomResponse.failure(res, statusCode.serverError, err.message);
    }
}
