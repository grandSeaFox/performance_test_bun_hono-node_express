export interface Securities {
  symbol: string;
  name?: string;
  exchange: string;
  assetType: string;
  ipoDate: Date;
  delistingDate?: Date | null;
  status?: string;
  country?: string | null;
  sector?: string | null;
  industry?: string | null;
}
