import { StatusCounts } from "../../interfaces/bank_availability.interface";
import CalculationService from "../../services/calculation.service";

describe('Calculation Service', () => {
    describe('calculateAvailability', () => {
        it('should calculate availability percentage correctly', () => {
            const statusCounts: StatusCounts = {
                '00': 70,
                '01': 15,
                '91': 3,
                '97': 1
            };

            const result = CalculationService.calculateAvailability(statusCounts);

            expect(result.availability_percentage).toBe(95.51);
            expect(result.total_transactions).toBe(89);
        });

        it('should return null availability when no transactions', () => {
            const statusCounts: StatusCounts = {};

            const result = CalculationService.calculateAvailability(statusCounts);

            expect(result.availability_percentage).toBeNull();
            expect(result.total_transactions).toBe(0);
        });

        it('should handle partial status codes', () => {
            const statusCounts: StatusCounts = {
                '00': 50,
                '91': 10
            };

            const result = CalculationService.calculateAvailability(statusCounts);

            expect(result.availability_percentage).toBe(83.33);
            expect(result.total_transactions).toBe(60);
        });
    });

    describe('calculateConfidenceLevel', () => {
        it('should return "Insufficient Data" for 0 transactions', () => {
            expect(CalculationService.calculateConfidenceLevel(0)).toBe('Insufficient Data');
        });

        it('should return "Low" for transactions <= 10', () => {
            expect(CalculationService.calculateConfidenceLevel(5)).toBe('Low');
            expect(CalculationService.calculateConfidenceLevel(10)).toBe('Low');
        });

        it('should return "Medium" for transactions <= 50', () => {
            expect(CalculationService.calculateConfidenceLevel(25)).toBe('Medium');
            expect(CalculationService.calculateConfidenceLevel(50)).toBe('Medium');
        });

        it('should return "High" for transactions > 50', () => {
            expect(CalculationService.calculateConfidenceLevel(100)).toBe('High');
        });
    });
});