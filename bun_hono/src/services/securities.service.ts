import { SecuritiesRepository } from "../repositories/securities.repository";
import type { CacheItem } from "../types/cacheItem";
import type { Securities } from "../types/securities";

export class SecuritiesService {
  private repository: SecuritiesRepository;

  constructor() {
    this.repository = new SecuritiesRepository();
  }

  async findSecuritiesByFuzzyQuery(
    fuzzyQuery: string,
    cache?: boolean
  ): Promise<Securities[]> {
    return this.repository.searchByTsQuery(fuzzyQuery, cache);
  }

  async showCache(): Promise<CacheItem[]> {
    return this.repository.showAllCache();
  }

  async deleteCache(): Promise<void> {
    this.repository.deleteAllCache();
  }
}
