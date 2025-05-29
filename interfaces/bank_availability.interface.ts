import mongoose from 'mongoose';

export interface IBankAvailability {
    bank_nip_code: string,
    time_window: '1h' | '6h' | '24h';
    availability_percentage: number | null;
    confidence_level: 'High' | 'Medium' | 'Low' | 'Insufficient Data';
    total_transactions_in_window: number,
    status_counts: Record<string, any>,
    last_calculated_at: Date
};
