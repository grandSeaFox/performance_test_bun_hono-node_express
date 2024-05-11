import sql from "../config/PostgresClient";

export class SecuritiesRepository {
  async findAll(): Promise<any[]> {
    return sql`SELECT * FROM securities`;
  }

  async searchByTsQuery(inputQuery: string): Promise<any[]> {
    const formattedQuery = inputQuery.trim() + ":*";

    try {
      return sql`
      SELECT *, ts_rank(document_tsvector, to_tsquery(${formattedQuery})) as rank
      FROM securities
      WHERE document_tsvector @@ to_tsquery(${formattedQuery})
      ORDER BY rank DESC
      LIMIT 30
  `;
    } catch (error) {
      throw new Error("Search operation failed.");
    }
  }
}
