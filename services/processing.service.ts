import { logger } from "../helpers/logger";
import { TimeWindow } from "../interfaces/bank_availability.interface";
import BankAvailability from "../models/bank_availability.model";
import CalculationService from "./calculation.service";
import DataSimulationService from "./data_simulation.service";

export default class ProcessingService {
    static processTimeWindow = async (timeWindow: TimeWindow) => {
        try {
            logger.info(`Starting processing for time window: ${timeWindow}`);
            const transactionData = DataSimulationService.generateTransactionData(timeWindow);
            for (const data of transactionData) {
                const { availability_percentage, total_transactions } =
                    CalculationService.calculateAvailability(data.status_counts);
                const confidence_level = CalculationService.calculateConfidenceLevel(total_transactions);
                const record = {
                    bank_nip_code: data.bank_nip_code,
                    time_window: timeWindow,
                    availability_percentage,
                    confidence_level,
                    total_transactions_in_window: total_transactions,
                    status_counts: data.status_counts,
                    last_calculated_at: new Date()
                };
                await BankAvailability.findOneAndUpdate(
                    { bank_nip_code: data.bank_nip_code, time_window: timeWindow },
                    record,
                    { upsert: true, new: true }
                );
            }
            logger.info(`Completed processing for time window: ${timeWindow}`);
        } catch (error) {
            logger.error(`Error processing time window ${timeWindow}:`, error);
            throw error;
        }
    }

    static processAllTimeWindows = async () => {
        const timeWindows: TimeWindow[] = ['1h', '6h', '24h'];
        for (const window of timeWindows) {
            await this.processTimeWindow(window);
        }
    }
}