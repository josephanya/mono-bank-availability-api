import DataSimulationService from "../../services/data_simulation.service";

describe('DataSimulation Service', () => {
    describe('generateTransactionData', () => {
        it('should generate data for all monitored banks', () => {
            const data = DataSimulationService.generateTransactionData('1h');

            expect(data).toBeInstanceOf(Array);
            expect(data.length).toBeGreaterThan(0);

            data.forEach(bankData => {
                expect(bankData).toHaveProperty('bank_nip_code');
                expect(bankData).toHaveProperty('status_counts');
                expect(typeof bankData.bank_nip_code).toBe('string');
            });
        });

        it('should generate different volumes for different time windows', () => {
            const data1h = DataSimulationService.generateTransactionData('1h');
            const data24h = DataSimulationService.generateTransactionData('24h');

            expect(data1h.length).toBe(data24h.length);

            const total1h = Object.values(data1h[0].status_counts).reduce((sum, count) => sum + (count || 0), 0);
            const total24h = Object.values(data24h[0].status_counts).reduce((sum, count) => sum + (count || 0), 0);

            expect(total24h).toBeGreaterThanOrEqual(total1h);
        });
    });
});