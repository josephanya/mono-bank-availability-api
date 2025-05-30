import { Request, Response, NextFunction } from "express"
import statusCodes from '../helpers/status_codes';
import { config } from '../config';

export const apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
    const userApiKey = req.headers['x-api-key'];
    if (!userApiKey) {
        return res.status(statusCodes.unAuthorized).json({ status: 'failed', error: 'API key missing' });
    }
    if (userApiKey !== config.apiKey) {
        return res.status(statusCodes.forbidden).json({ status: 'failed', error: 'Invalid API key' });
    }
    next();
};
