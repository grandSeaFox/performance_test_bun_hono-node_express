// src/shared/types/cronTicker.ts
export type CronQueue = {
  shouldRun: boolean;
  hasRun: boolean;
  ranAt: Date | null;
};

export type CronTicker = {
  stock?: CronQueue;
  companyProfile?: CronQueue;
  calendar?: CronQueue;
  dividendHistory?: CronQueue;
  financialData?: CronQueue;
  market?: CronQueue;
  news?: CronQueue;
  stockHistory?: CronQueue;
};
