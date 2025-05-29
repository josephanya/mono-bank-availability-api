import { Request, Response, NextFunction } from "express"

class Authorization {
    apiKeyAuth = (req: Request, res: Response, next: NextFunction) => {
        const userApiKey = req.headers['x-api-key'];
        if (!userApiKey) {
            return res.status(401).json({ error: 'API key missing' });
        }
        if (userApiKey !== process.env.API_KEY) {
            return res.status(403).json({ error: 'invalid API key' });
        }
        next();
    };
}

export default new Authorization()