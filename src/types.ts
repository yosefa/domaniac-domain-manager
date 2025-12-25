export interface Domain {
  id: string;
  name: string;
  registrar: string;
  expiryDate: string; // ISO Date string
  price: number;
  currency: string;
  autoRenew: boolean;
  notes?: string;
  tags: string[];
}

export enum NotificationLevel {
  SAFE = 'SAFE',
  WARNING = 'WARNING',
  CRITICAL = 'CRITICAL',
  EXPIRED = 'EXPIRED'
}

export interface Stats {
  totalDomains: number;
  totalCost: number;
  expiringSoon: number; // < 30 days
  expired: number;
}


