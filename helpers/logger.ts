import pino from 'pino';
import { config } from '../config';

const isProduction = config.nodeEnv === 'production';

export const logger = pino({
    level: 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
        level(label) {
            return { level: label };
        },
    },
    base: {
        service: 'bank-availability-service',
    },
    transport: isProduction
        ? {
            targets: [
                {
                    target: 'pino/file',
                    options: { destination: 'logs/combined.log' },
                },
                {
                    target: 'pino/file',
                    options: {
                        destination: 'logs/error.log',
                        level: 'error',
                    },
                },
            ],
        }
        : {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname',
            },
        },
});