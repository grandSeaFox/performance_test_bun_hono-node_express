import express from "express";
import StocksController from "./controllers/PostgresController/securities.controller";

const app = express();

async function init() {
  app.use("/api", StocksController);
  app.listen(process.env.API_PORT, () =>
    console.log(`Server running on port [${process.env.API_PORT}]`)
  );
}

init().catch((error) => {
  console.error("Failed to start the server:", error);
});
