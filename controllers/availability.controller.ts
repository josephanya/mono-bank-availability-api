import { Request, Response, NextFunction } from "express";
import CustomResponse from "../helpers/response"
import statusCode from "../helpers/status_codes"
import BankAvailabilityService from "../services/availability.service";
import { TimeWindow } from "../interfaces/bank_availability.interface";
import { config } from '../config';

class AvailabilityController {
    private bankAvailabilityService: BankAvailabilityService;

    constructor() {
        this.bankAvailabilityService = new BankAvailabilityService();
    }

    getAllBanksAvailability = async (req: Request, res: Response, next: NextFunction) => {
        const window = req.query.window as TimeWindow || '1h';
        try {
            const records = await this.bankAvailabilityService.getAllBanksAvailability(window);
            if (records.length === 0) {
                return CustomResponse.failure(res, statusCode.notFound, `No availability data found for time window: ${window}`)
            }
            const data = records.map(record => ({
                bank_nip_code: record.bank_nip_code,
                time_window: record.time_window,
                availability_percentage: record.availability_percentage,
                confidence_level: record.confidence_level,
                last_calculated_at: record.last_calculated_at.toISOString()
            }));
            return CustomResponse.success(res, statusCode.success, data, window);
        } catch (e) {
            next(e);
        }
    }

    getBankAvailability = async (req: Request, res: Response, next: NextFunction) => {
        const { bank_nip_code } = req.params;
        const window = req.query.window as TimeWindow || '1h';
        try {
            if (!config.monitoredBanks.includes(bank_nip_code)) {
                return CustomResponse.failure(res, statusCode.notFound, 'Bank not found or not monitored')
            }
            const record = await this.bankAvailabilityService.getBankAvailability(window, bank_nip_code);
            if (!record) {
                return CustomResponse.failure(res, statusCode.notFound, `No availability data found for bank ${bank_nip_code} in time window: ${window}`)
            }
            const data = {
                bank_nip_code: record.bank_nip_code,
                time_window: record.time_window,
                availability_percentage: record.availability_percentage,
                confidence_level: record.confidence_level,
                last_calculated_at: record.last_calculated_at.toISOString()
            };
            return CustomResponse.success(res, statusCode.success, data, window);
        } catch (e) {
            next(e);
        }
    }
}

export default new AvailabilityController();