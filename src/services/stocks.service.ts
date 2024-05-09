// src/shared/services/StocksService.ts
import { Securities, SecuritiesSchema } from "../models/Securities.model";
import { searchStocks } from "./domain";

class StocksService {
  async searchStockByQuery(
    query: string,
  ): Promise<Array<Securities>> {
    try {
      const stocks = await searchStocks({ query });
      return stocks.map((stock) => SecuritiesSchema.parse(stock));
    } catch (error) {
      console.error("Error searching and validating stocks:", error);
      return [];
    }
  }
}

export default new StocksService();
