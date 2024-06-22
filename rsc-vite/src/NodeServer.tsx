import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createServer as createHttpServer } from "node:http";

import * as Vite from "./ViteRuntime.ts";

const app = new Hono();

const createServer = ((options: any, listener: any) => {
  return createHttpServer(options, (req, res) =>
    Vite.server.middlewares.handle(req, res, () => listener?.(req, res))
  );
});

const server = serve({
  createServer,
  fetch: app.fetch,
  port: 4000
});