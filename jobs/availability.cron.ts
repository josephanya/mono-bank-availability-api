import * as cron from 'node-cron';
import ProcessingService from "../services/processing.service";
import { logger } from '../helpers/logger';
import { config } from '../config';

export default class AvailabilityCronService {
    private static jobs: cron.ScheduledTask[] = [];

    static start = () => {
        const job1h = cron.schedule(`*/${config.processingFrequencies['1h']} * * * *`, async () => {
            try {
                await ProcessingService.processTimeWindow('1h');
            } catch (error) {
                logger.error('Error in 1h processing job:', error);
            }
        });

        const job6h = cron.schedule(`*/${config.processingFrequencies['6h']} * * * *`, async () => {
            try {
                await ProcessingService.processTimeWindow('6h');
            } catch (error) {
                logger.error('Error in 6h processing job:', error);
            }
        });

        const job24h = cron.schedule(`*/${config.processingFrequencies['24h']} * * * *`, async () => {
            try {
                await ProcessingService.processTimeWindow('24h');
            } catch (error) {
                logger.error('Error in 24h processing job:', error);
            }
        });

        this.jobs = [job1h, job6h, job24h];
        logger.info('Scheduler started');
    }

    static stop = () => {
        this.jobs.forEach(job => job.stop());
        this.jobs = [];
        logger.info('Scheduler stopped');
    }
}