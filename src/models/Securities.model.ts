import { z } from "zod";
import { CronSchema } from "./Cron.model";

export const SecuritiesSchema = z.object({
  symbol: z.string(),
  name: z.string().optional(),
  exchange: z.string(),
  assetType: z.string(),
  ipoDate: z.date(),
  delistingDate: z.date().optional().nullable(),
  status: z.string().optional(),
  country: z.string().optional().nullable(),
  sector: z.string().optional().nullable(),
  industry: z.string().optional().nullable(),
});

export type Securities = z.infer<typeof SecuritiesSchema>;
