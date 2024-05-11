import { Hono } from "hono";
import stocksService from "../../services/MongoServices/stocks.service";

const StocksController = new Hono();

StocksController.get("/search", async (c) => {
  const query = c.req.query("query");
  if (typeof query !== "string") {
    return c.json({ error: "Query should be a string" }, 400);
  }
  if (!query) {
    return c.json({ error: "Please provide a search query." }, 400);
  }

  try {
    const securities = await stocksService.searchStockByQuery(query);

    if (!securities || Object.keys(securities).length === 0) {
      return c.json(
        { message: "No securities available for the provided symbol." },
        204
      );
    }

    return c.json(securities);
  } catch (error: any) {
    console.error("Error searching for stocks:", error);
    return c.json({ error: error.message }, 500);
  }
});

export default StocksController;
