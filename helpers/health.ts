import { Request, Response } from "express";

export const health = async (req: Request, res: Response) => {
    const data = {
        uptime: process.uptime(),
        response_time: process.hrtime(),
        message: 'service is up',
        date: new Date()
    }
    res.status(200).send(data);
}