import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import StocksController from "./controllers/PostgresController/securities.controller";
import { customLogger } from "./middlewares/customLogger";
/* import transferData from "./utils"; */

const app = new Hono();

app.use(customLogger);
app.use("/public", serveStatic({ root: "../public" }));

app.get("/", async (c) => {
  const htmlContent = await Bun.file("./public/index.html").text();
  return c.html(htmlContent);
});
app.route("/stocks", StocksController);

/* transferData(); */

export default {
  port: process.env.API_PORT,
  fetch: app.fetch,
};
