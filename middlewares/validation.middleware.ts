import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import statusCodes from '../helpers/status_codes';

const timeWindowSchema = Joi.string().valid('1h', '6h', '24h');

export const validateTimeWindow = (req: Request, res: Response, next: NextFunction) => {
    const { window } = req.query;
    if (window) {
      const { error } = timeWindowSchema.validate(window);
      if (error) {
        return res.status(statusCodes.badRequest).json({
          error: 'Bad Request',
          message: 'Invalid window parameter. Must be one of: 1h, 6h, 24h'
        });
      }
    }
    next();
  };
