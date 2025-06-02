import mongoose from "mongoose";
import { logger } from "../helpers/logger";
import { config } from ".";

export default class MongoClient {
    static connect = async () => {
        try {
            await mongoose.connect(config.mongoUri);
            logger.info('Connected to database')
        } catch (error) {
            logger.error(error)
            process.exit(1);
        }
    }

    static disconnect = async () => {
        await mongoose.disconnect();
        logger.info('Disconnected from database');
    }
}