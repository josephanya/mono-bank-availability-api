import { Router } from "express";
import AvailabilityController from "../controllers/availability.controller";
import Authorization from "../middlewares/authorization.middleware";

const availabilityRoute = Router();

availabilityRoute.get(
    '/availability',
    // Authorization.apiKeyAuth,
    AvailabilityController.getAllAvailability
);

availabilityRoute.get(
    '/:bank_nip_code/availability',
    // Authorization.apiKeyAuth,
    AvailabilityController.getAvailability
);

export default availabilityRoute;