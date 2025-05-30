import { StatusCounts } from "../interfaces/bank_availability.interface";
import { config } from '../config';

export default class CalculationService {
    static calculateAvailability = (statusCounts: StatusCounts) => {
        const successful = (statusCounts['00'] || 0) + (statusCounts['01'] || 0);
        const unavailable = (statusCounts['91'] || 0) + (statusCounts['97'] || 0);
        const total = successful + unavailable;
        if (total === 0) {
            return {
                availability_percentage: null,
                total_transactions: 0
            };
        }
        const percentage = (successful / total) * 100;
        return {
            availability_percentage: Math.round(percentage * 100) / 100,
            total_transactions: total
        };
    }

    static calculateConfidenceLevel = (totalTransactions: number) => {
        if (totalTransactions === 0) {
            return 'Insufficient Data';
        }
        if (totalTransactions <= config.confidenceThresholds.low) {
            return 'Low';
        }
        if (totalTransactions <= config.confidenceThresholds.medium) {
            return 'Medium';
        }
        return 'High';
    }
}