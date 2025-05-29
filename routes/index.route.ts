import { Router, Request, Response, NextFunction } from "express";
import availabilityRoutes from "./availability.route";

const indexRoute = Router();

indexRoute.use('/banks', availabilityRoutes);

indexRoute.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        message: 'resource or endpoint not found',
        path: req.path,
        method: req.method
    })
});

export default indexRoute;