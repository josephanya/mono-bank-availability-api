export interface StatusCounts {
    '00'?: number;
    '01'?: number;
    '91'?: number;
    '97'?: number;
    [key: string]: number | undefined;
}

export interface BankAvailabilityRecord {
    bank_nip_code: string;
    time_window: '1h' | '6h' | '24h';
    availability_percentage: number | null;
    confidence_level: 'High' | 'Medium' | 'Low' | 'Insufficient Data';
    total_transactions_in_window: number;
    status_counts: StatusCounts;
    last_calculated_at: Date;
}

export interface TransactionData {
    bank_nip_code: string;
    status_counts: StatusCounts;
}

export type ConfidenceLevel = 'High' | 'Medium' | 'Low' | 'Insufficient Data';
export type TimeWindow = '1h' | '6h' | '24h';
