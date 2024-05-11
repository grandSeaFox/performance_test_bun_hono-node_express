import { Hono } from "hono";
import { SecuritiesService } from "../../services/PosgresServices/securities.service";

const securitiesService = new SecuritiesService();
const StocksController = new Hono();

StocksController.get("/search", async (c) => {
  const query = c.req.query("query");
  const cache = !!c.req.query("cache");

  if (typeof query !== "string") {
    return c.json({ error: "Query should be a string" }, 400);
  }

  if (!query) {
    return c.json({ error: "Please provide a search query." }, 400);
  }

  try {
    const securities = await securitiesService.findSecuritiesByFuzzyQuery(
      query,
      cache
    );

    if (!securities || securities.length === 0) {
      return c.json(
        { message: "No securities available for the provided symbol." },
        204
      );
    }

    return c.json(securities);
  } catch (error: any) {
    console.error("Error searching for stocks:", error);
    return c.json({ error: error.message.message }, 500);
  }
});

StocksController.get("/cache", async (c) => {
  try {
    const cacheItems = await securitiesService.showCache();

    if (!cacheItems || cacheItems.length === 0) {
      return c.json({ message: "No cacheItems available to show." }, 204);
    }

    return c.json(cacheItems);
  } catch (error: any) {
    console.error("Error searching for cacheItems:", error);
    return c.json({ error: error.message.message }, 500);
  }
});

StocksController.delete("/cache", async (c) => {
  try {
    await securitiesService.deleteCache();
    const cacheItems = await securitiesService.showCache();

    if (!cacheItems || cacheItems.length === 0) {
      return c.json({ message: "Deleted cached items" }, 200);
    }

    return c.json(cacheItems);
  } catch (error: any) {
    console.error("Error searching for cacheItems:", error);
    return c.json({ error: error.message.message }, 500);
  }
});

export default StocksController;
