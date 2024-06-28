import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createServer as createHttpServer, IncomingMessage, ServerResponse } from 'node:http';

import * as Vite from "./ViteRuntime.ts";
import { ServerOptions } from 'http';

const app = new Hono();

const createServer = ((options, listener) => {
  return createHttpServer(options as ServerOptions<typeof IncomingMessage, typeof ServerResponse> , (req, res) =>
    Vite.server.middlewares.handle(req, res, () => listener?.(req, res))
  );
}) as typeof createHttpServer;

const server = serve({
  createServer,
  fetch: app.fetch,
  port: 4000
});
