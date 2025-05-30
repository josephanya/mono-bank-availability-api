import { Request, Response } from "express";
import mongoose from "mongoose";

export const health = async (req: Request, res: Response) => {
    try {
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
        const data = {
            message: 'Service is up',
            uptime: process.uptime(),
            response_time: process.hrtime(),
            database: dbStatus,
            timestamp: new Date()
        }
        res.status(200).send(data);
    } catch (e) {
        const data = {
            error: 'Health check failed',
            timestamp: new Date().toISOString(),
        }
        res.status(503).json(data);
    }
}