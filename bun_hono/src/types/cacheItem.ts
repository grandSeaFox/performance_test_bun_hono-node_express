import type { Securities } from "./securities";

export interface CacheItem {
  key: string;
  value: Securities[];
  expire: number;
}
