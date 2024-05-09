import connect from "../../config/dbClient";

export const searchStocks = async ({ query }: { query: string }) => {
  const db = await connect();
  const normalizedQuery = query.toUpperCase();

  const projection = {
    cronInfo: 0,
    _id: 0,
    __v: 0,
  };

  let findQuery = {};
  if (normalizedQuery.length === 1) {
    findQuery = { symbol: normalizedQuery };
  } else {
    findQuery = { $text: { $search: normalizedQuery } };
  }

  try {
    return db
      .collection("securities")
      .find(findQuery, { projection })
      .sort(
        normalizedQuery.length === 1 ? {} : { score: { $meta: "textScore" } }
      )
      .limit(50)
      .toArray();
  } catch (error: any) {
    console.error("Error fetching stocks:", error);
    throw new Error(`Failed to fetch stocks: ${error.message}`);
  }
};
