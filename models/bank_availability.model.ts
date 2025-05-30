import mongoose, { Schema } from 'mongoose';
import { BankAvailabilityRecord } from '../interfaces/bank_availability.interface';

export interface IBankAvailability extends BankAvailabilityRecord, Document {}

const statusCountsSchema = new Schema({
    '00': { type: Number, default: 0 },
    '01': { type: Number, default: 0 },
    '91': { type: Number, default: 0 },
    '97': { type: Number, default: 0 }
}, { _id: false });

const bankAvailabilitySchema = new Schema({
    bank_nip_code: {
        type: String,
        required: true,
        index: true
    },
    time_window: {
        type: String,
        required: true,
        enum: ['1h', '6h', '24h'],
        index: true
    },
    availability_percentage: {
        type: Number,
        default: null
    },
    confidence_level: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low', 'Insufficient Data']
    },
    total_transactions_in_window: {
        type: Number,
        required: true,
        default: 0
    },
    status_counts: {
        type: statusCountsSchema,
        required: true
    },
    last_calculated_at: {
        type: Date,
        required: true,
        default: Date.now,
        index: true
    }
}, {
    timestamps: true
});

bankAvailabilitySchema.index({ bank_nip_code: 1, time_window: 1 }, { unique: true });

const BankAvailability = mongoose.model<IBankAvailability>('bank_availability_stats', bankAvailabilitySchema);

export default BankAvailability;