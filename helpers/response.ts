import { Response } from "express";

class CustomResponse {
    success(res: Response, status: number, data?: any, requested_window?: string ) {
        return res.status(status).json({
            status: 'success',
            data,
            requested_window,
        });
    }

    failure(res: Response, status: number, message: string, data?: any ) {
        return res.status(status).json({
            status: 'failed',
            message,
            data,
        });
    }
}
export default new CustomResponse();