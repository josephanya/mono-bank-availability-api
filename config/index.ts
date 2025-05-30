import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: parseInt(process.env.PORT || '3000'),
    mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bank-availability',

    apiKey: process.env.API_KEY || 'secure-api-key',
    nodeEnv: process.env.NODE_ENV || 'development',

    monitoredBanks: process.env.MONITORED_BANKS?.split(',') || ['NIP001', 'NIP002', 'NIP003', 'NIP004', 'NIP005'],

    processingFrequencies: {
        '1h': parseInt(process.env.PROCESS_FREQ_1H || '2'),
        '6h': parseInt(process.env.PROCESS_FREQ_6H || '10'),
        '24h': parseInt(process.env.PROCESS_FREQ_24H || '30')
    },

    confidenceThresholds: {
        low: parseInt(process.env.CONFIDENCE_LOW_THRESHOLD || '10'),
        medium: parseInt(process.env.CONFIDENCE_MEDIUM_THRESHOLD || '50')
    },
};