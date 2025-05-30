import { Router } from "express";
import AvailabilityController from "../controllers/availability.controller";
import { apiKeyAuth } from "../middlewares/authorization.middleware";
import { validateTimeWindow } from "../middlewares/validation.middleware";

const availabilityRoute = Router();

availabilityRoute.get(
    '/availability',
    apiKeyAuth,
    validateTimeWindow,
    AvailabilityController.getAllBanksAvailability
);

availabilityRoute.get(
    '/:bank_nip_code/availability',
    apiKeyAuth,
    validateTimeWindow,
    AvailabilityController.getBankAvailability
);

export default availabilityRoute;