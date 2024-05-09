import { CronTicker } from "./cron";

export type Securities = {
  symbol: string;
  name: string;
  exchange: string;
  assetType: string;
  ipoDate: Date;
  delistingDate?: Date;
  status?: string;
  country?: string;
  sector?: string;
  industry?: string;
  cronInfo: CronTicker;
};
