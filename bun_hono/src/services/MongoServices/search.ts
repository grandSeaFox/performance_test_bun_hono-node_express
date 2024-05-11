import mongodb from "../../config/MongoDbClient";

export const searchStocks = async ({ query }: { query: string }) => {
  const db = await mongodb;

  const regexPattern = new RegExp(query.split("").join(".*"), "i");

  const projection = {
    cronInfo: 0,
    _id: 0,
    __v: 0,
  };
  try {
    let results = await db
      .collection("securities")
      .find(
        {
          $or: [
            { symbol: { $regex: regexPattern } },
            { name: { $regex: regexPattern } },
          ],
        },
        {
          projection,
        }
      )
      .toArray();

    results = results
      .map((result) => ({
        ...result,
        score: calculateScore(result, query),
      }))
      .sort((a, b) => b.score - a.score);

    return results.slice(0, 10);
  } catch (error: any) {
    console.error("Error fetching stocks:", error);
    throw new Error(`Failed to fetch stocks: ${error.message}`);
  }
};

function calculateScore(item: any, query: string): number {
  let score = 0;

  if (item.symbol.toLowerCase() === query.toLowerCase()) score += 100;
  if (item.name?.toLowerCase().includes(query.toLowerCase())) score += 10;

  return score;
}
