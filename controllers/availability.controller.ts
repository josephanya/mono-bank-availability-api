import { Request, Response, NextFunction } from "express";
import CustomResponse from "../helpers/response"
import statusCode from "../helpers/status_codes"

class AvailabilityController {
    getAllAvailability = async (req: Request, res: Response, next: NextFunction) => {
        const window = req.query.window as string || '';
        try {
            return CustomResponse.success(res, statusCode.success, [
                {
                    "bank_nip_code": "NIP001",
                    "time_window": "1h",
                    "availability_percentage": 95.24,
                    "confidence_level": "High",
                    "last_calculated_at": "2025-05-25T10:30:00Z"
                },
                {
                    "bank_nip_code": "NIP001",
                    "time_window": "1h",
                    "availability_percentage": 95.24,
                    "confidence_level": "High",
                    "last_calculated_at": "2025-05-25T10:30:00Z"
                }
            ], window);
        } catch (e) {
            next(e);
        }
    }

    getAvailability = async (req: Request, res: Response, next: NextFunction) => {
        const bank_nip_code = req.params.bank_nip_code || '';
        const window = req.query.window as string || '';
        try {
            return CustomResponse.success(res, statusCode.success, {
                "bank_nip_code": bank_nip_code,
                "time_window": "1h",
                "availability_percentage": 95.24,
                "confidence_level": "High",
                "last_calculated_at": "2025-05-25T10:30:00Z"
            }, window);
        } catch (e) {
            next(e);
        }
    }
}

export default new AvailabilityController();