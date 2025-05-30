import BankAvailability from "../models/bank_availability.model";
import { BaseError } from "../helpers/error";
import statusCode from "../helpers/status_codes";

export default class BankAvailabilityService {
    getAllBanksAvailability = async (window: string) => {
        try {
            const records = await BankAvailability.find({
                time_window: window
            }).select('-__v -createdAt -updatedAt');
            return records
        } catch (e) {
            throw new BaseError('Could not fetch availability data', statusCode.notFound);
        }
    }

    getBankAvailability = async (window: string, bank_nip_code: string) => {
        try {
            const record = await BankAvailability.findOne({
                bank_nip_code,
                time_window: window
            }).select('-__v -createdAt -updatedAt');
            return record
        } catch (e) {
            throw new BaseError('Could not fetch availability data', statusCode.notFound);
        }
    }
}