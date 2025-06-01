import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app';
import BankAvailability from "../../models/bank_availability.model";
import { config } from '../../config';
import { RedisMemoryServer } from 'redis-memory-server';
import { redisClient } from '../../config/redis.connect';


describe('Bank Availability Controller', () => {
    let mongoServer: MongoMemoryServer;
    let redisServer: RedisMemoryServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        redisServer = new RedisMemoryServer();
        const host = await redisServer.getHost();
        const port = await redisServer.getPort();
        const redisUrl = `redis://${host}:${port}`;
        process.env.REDIS_URL = redisUrl;
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
        if (redisClient.isOpen) {
            await redisClient.quit();
        }
        if (redisServer) {
            await redisServer.stop();
        }
    });

    beforeEach(async () => {
        await BankAvailability.deleteMany({});
        await BankAvailability.create([
            {
                bank_nip_code: 'NIP001',
                time_window: '1h',
                availability_percentage: 95.24,
                confidence_level: 'High',
                total_transactions_in_window: 89,
                status_counts: { '00': 70, '01': 15, '91': 3, '97': 1 },
                last_calculated_at: new Date()
            },
            {
                bank_nip_code: 'NIP002',
                time_window: '1h',
                availability_percentage: null,
                confidence_level: 'Insufficient Data',
                total_transactions_in_window: 0,
                status_counts: {},
                last_calculated_at: new Date()
            }
        ]);
        if (redisClient.isOpen) {
            await redisClient.flushAll();
        }
    });

    describe('GET /banks/availability', () => {
        it('should return all banks availability with valid API key', async () => {
            const response = await request(app)
                .get('/banks/availability')
                .set('x-api-key', config.apiKey)
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('requested_window', '1h');
            expect(response.body.data).toBeInstanceOf(Array);
            expect(response.body.data.length).toBe(2);
        });

        it('should return 401 without API key', async () => {
            await request(app)
                .get('/banks/availability')
                .expect(401);
        });

        it('should filter by time window', async () => {
            await request(app)
                .get('/banks/availability?window=1h')
                .set('x-api-key', config.apiKey)
                .expect(200);
        });

        it('should return 400 for invalid window parameter', async () => {
            await request(app)
                .get('/banks/availability?window=invalid')
                .set('x-api-key', config.apiKey)
                .expect(400);
        });
    });

    describe('GET /banks/:bank_nip_code/availability', () => {
        it('should return specific bank availability', async () => {
            const response = await request(app)
                .get('/banks/NIP001/availability')
                .set('x-api-key', config.apiKey)
                .expect(200);

            expect(response.body.data).toHaveProperty('bank_nip_code', 'NIP001');
            expect(response.body.data).toHaveProperty('availability_percentage', 95.24);
            expect(response.body.data).toHaveProperty('confidence_level', 'High');
        });

        it('should return 404 for non-monitored bank', async () => {
            await request(app)
                .get('/banks/INVALID/availability')
                .set('x-api-key', config.apiKey)
                .expect(404);
        });
    });
});
