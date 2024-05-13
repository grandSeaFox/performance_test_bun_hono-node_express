import { Request, Response, Router } from "express";
import { SecuritiesService } from "../services/securities.service";

const securitiesService = new SecuritiesService();
const StocksController = Router();

StocksController.get("/search", async (req: Request, res: Response) => {
  const { query, cache } = req.query;

  if (typeof query !== "string") {
    return res.status(400).send({ error: "Query should be a string" });
  }

  if (!query) {
    return res.status(400).send({ error: "Please provide a search query." });
  }

  try {
    const securities = await securitiesService.findSecuritiesByFuzzyQuery(
      query,
      !!cache
    );

    if (!securities || securities.length === 0) {
      return res
        .status(204)
        .json({ message: "No security available for the provided symbol." });
    }

    return res.status(200).send(securities);
  } catch (error: any) {
    console.error("Error searching for stocks:", error);
    res.status(500).send(error.message);
  }
});

StocksController.get("/cache", async (req: Request, res: Response) => {
  try {
    const cacheItems = await securitiesService.showCache();

    if (!cacheItems || cacheItems.length === 0) {
      return res.status(204).json({ message: "No available cache to show" });
    }

    return res.status(200).send(cacheItems);
  } catch (error: any) {
    console.error("Error searching for cacheItems:", error);
    res.status(500).send(error.message);
  }
});

StocksController.delete("/cache", async (req: Request, res: Response) => {
  try {
    await securitiesService.deleteCache();
    const cacheItems = await securitiesService.showCache();

    if (!cacheItems || cacheItems.length === 0) {
      return res.status(204).json({ message: "Deleted cached items" });
    }

    return res.status(200).send(cacheItems);
  } catch (error: any) {
    console.error("Error searching for cacheItems:", error);
    res.status(500).send(error.message);
  }
});

export default StocksController;
