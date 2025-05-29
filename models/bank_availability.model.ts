import mongoose from 'mongoose';
import { IBankAvailability } from '../interfaces/bank_availability.interface';

const bankAvailabilitySchema = new mongoose.Schema({
    bank_nip_code: String,
    time_window: String,
    availability_percentage: Number,
    confidence_level: String,
    total_transactions_in_window: Number,
    status_counts: Object,
    last_calculated_at: Date
}, { timestamps: true });

export default mongoose.model<IBankAvailability>('bank_availability', bankAvailabilitySchema);