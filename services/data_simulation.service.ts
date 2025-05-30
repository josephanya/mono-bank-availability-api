import { config } from "../config";
import { TimeWindow } from "../interfaces/bank_availability.interface";

export default class DataSimulationService {
    private static getRandomStatusCounts = (timeWindow: TimeWindow) => {
        const baseMultiplier = {
            '1h': 1,
            '6h': 6,
            '24h': 24
        };
        const multiplier = baseMultiplier[timeWindow];
        const successful00 = Math.floor(Math.random() * 100 * multiplier);
        const successful01 = Math.floor(Math.random() * 20 * multiplier);
        const unavailable91 = Math.floor(Math.random() * 5 * multiplier);
        const unavailable97 = Math.floor(Math.random() * 3 * multiplier);
        return {
            '00': successful00,
            '01': successful01,
            '91': unavailable91,
            '97': unavailable97
        };
    }

    static generateTransactionData = (timeWindow: TimeWindow) => {
        return config.monitoredBanks.map(bankCode => ({
            bank_nip_code: bankCode,
            status_counts: this.getRandomStatusCounts(timeWindow)
        }));
    }
}