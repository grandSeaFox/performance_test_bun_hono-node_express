import type { MiddlewareHandler } from "hono/types";

export const customLogger: MiddlewareHandler = async (c, next) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;

  const queryParams = JSON.stringify(c.req.query());

  console.log(
    `${c.req.method} ${c.req.url} - ${c.res.status} - ${duration}ms - Query: ${queryParams}`
  );
};
