import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ProcessingService from '../../services/processing.service';
import BankAvailability from "../../models/bank_availability.model";

describe('Processing Service Integration', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(async () => {
        await BankAvailability.deleteMany({});
    });

    describe('processTimeWindow', () => {
        it('should process and store availability data', async () => {
            await ProcessingService.processTimeWindow('1h');

            const records = await BankAvailability.find({ time_window: '1h' });

            expect(records.length).toBeGreaterThan(0);

            records.forEach(record => {
                expect(record.bank_nip_code).toBeDefined();
                expect(record.time_window).toBe('1h');
                expect(record.confidence_level).toBeDefined();
                expect(record.total_transactions_in_window).toBeGreaterThanOrEqual(0);
                expect(record.status_counts).toBeDefined();
                expect(record.last_calculated_at).toBeInstanceOf(Date);
            });
        });

        it('should update existing records', async () => {
            await ProcessingService.processTimeWindow('1h');
            const firstCount = await BankAvailability.countDocuments({ time_window: '1h' });

            await ProcessingService.processTimeWindow('1h');
            const secondCount = await BankAvailability.countDocuments({ time_window: '1h' });

            expect(secondCount).toBe(firstCount);
        });
    });

    describe('processAllTimeWindows', () => {
        it('should process all time windows', async () => {
            await ProcessingService.processAllTimeWindows();

            const windows = ['1h', '6h', '24h'];

            for (const window of windows) {
                const count = await BankAvailability.countDocuments({ time_window: window });
                expect(count).toBeGreaterThan(0);
            }
        });
    });
});