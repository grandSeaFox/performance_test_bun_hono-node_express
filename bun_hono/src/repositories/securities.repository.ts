import sql from "../config/PostgresClient";
import type { CacheItem } from "../types/cacheItem";
import type { Securities } from "../types/securities";
import { preprocessAndValidateQuery, sanitizeInput } from "./utils/index";

class Cache {
  private cache = new Map<string, CacheItem>();
  private ttl: number = 1000 * 60 * 15;

  getAll(): CacheItem[] {
    const allItems: CacheItem[] = [];
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (item.expire > now) {
        allItems.push({
          key: item.key,
          value: item.value,
          expire: item.expire,
        });
      } else {
        this.cache.delete(key);
      }
    }
    return allItems;
  }
  get(key: string): Securities[] | undefined {
    const item = this.cache.get(key);
    if (item && item.expire > Date.now()) {
      return item.value;
    }
    this.cache.delete(key);
    return undefined;
  }

  set(key: string, value: Securities[]): void {
    const expire = Date.now() + this.ttl;
    this.cache.set(key, { key, value, expire });
  }

  deleteAll(): void {
    this.cache.clear();
  }
}

export class SecuritiesRepository {
  private cache = new Cache();

  async showAllCache(): Promise<CacheItem[]> {
    return this.cache.getAll();
  }

  async deleteAllCache(): Promise<void> {
    this.cache.deleteAll();
  }

  async searchByTsQuery(
    inputQuery: string,
    cache?: boolean
  ): Promise<Securities[]> {
    const sanitizedInput = sanitizeInput(inputQuery);
    const formattedQuery = `"${sanitizedInput.trim()}:*"`;

    if (!preprocessAndValidateQuery(formattedQuery)) {
      console.log(
        "Query contains only stop words or no lexemes. Returning 204 No Content."
      );
      return [];
    }

    const cacheKey = inputQuery;
    const cachedResult = this.cache.get(inputQuery);
    if (cache && cachedResult) {
      return cachedResult;
    }

    if (inputQuery.length === 1) {
      const result = await sql<Securities[]>`
          SELECT * FROM securities
          WHERE symbol = ${inputQuery.toUpperCase()}
      `;
      this.cache.set(cacheKey, result);
      return result;
    }

    try {
      const result = await sql<Securities[]>`
      SELECT *, ts_rank_cd(tsv, websearch_to_tsquery(${formattedQuery})) as rank
      FROM securities
      WHERE tsv @@ websearch_to_tsquery(${formattedQuery})
      ORDER BY rank DESC
      LIMIT 30
  `;
      this.cache.set(cacheKey, result);
      return result;
    } catch (error: any) {
      console.error("Error during full-text search:", error);
      throw error;
    }
  }
}
