import { z } from "zod";

export const CronQueueSchema = z.object({
  shouldRun: z.boolean(),
  hasRun: z.boolean(),
  ranAt: z.date().optional().nullable(),
});

export const CronSchema = z.object({
  stock: CronQueueSchema.optional(),
  companyProfile: CronQueueSchema.optional(),
  calendar: CronQueueSchema.optional(),
  dividendHistory: CronQueueSchema.optional(),
  financialData: CronQueueSchema.optional(),
  market: CronQueueSchema.optional(),
  news: CronQueueSchema.optional(),
  stockHistory: CronQueueSchema.optional(),
});

export type CronQueue = z.infer<typeof CronQueueSchema>;
export type Cron = z.infer<typeof CronSchema>;
