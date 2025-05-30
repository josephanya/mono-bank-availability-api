import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import indexRoutes from './routes/index.route';
import { errorHandler } from './middlewares/error.middleware';
import { health } from './helpers/health';
import { logger } from './helpers/logger';

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`, {
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });
    next();
});

app.get('/health', health);

app.use(indexRoutes);
app.use(errorHandler);

export default app;