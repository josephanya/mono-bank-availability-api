import './config/mongo.connect';

import app from './app'
import { logger } from './helpers/logger';
import AvailabilityCronService from './jobs/availability.cron';
import ProcessingService from './services/processing.service';
import { config } from './config';

const port = config.port;

const startServer = async () => {
    try {
        const server = app.listen(port, () => {
            logger.info(`Application started on port: ${port}`)
        });
        logger.info('Running initial data processing...');
        await ProcessingService.processAllTimeWindows();
        AvailabilityCronService.start();
        const shutdown = async (signal: string) => {
            logger.info(`${signal} received: closing server`);
            AvailabilityCronService.stop();
            server.close(async (err) => {
                if (err) {
                    logger.error('Error during server shutdown', err);
                    process.exit(1);
                }
                logger.info('Server closed gracefully');
                process.exit(0);
            });
        };
        process.on('SIGINT', () => shutdown('SIGINT'));
        process.on('SIGTERM', () => shutdown('SIGTERM'));
    } catch (e) {
        logger.error('Failed to start server:', e);
        process.exit(1);
    }
}

startServer();