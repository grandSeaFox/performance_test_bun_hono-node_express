import { SecuritiesRepository } from "../repositories/securities.repository";
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
}
