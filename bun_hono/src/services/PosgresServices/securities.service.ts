import { SecuritiesRepository } from "../../repositories/securities.repository";

export class SecuritiesService {
  private repository: SecuritiesRepository;

  constructor() {
    this.repository = new SecuritiesRepository();
  }

  async getAllSecurities(): Promise<any[]> {
    return this.repository.findAll();
  }

  async findSecuritiesByFuzzyQuery(fuzzyQuery: string): Promise<any[]> {
    return this.repository.searchByTsQuery(fuzzyQuery);
  }
}
