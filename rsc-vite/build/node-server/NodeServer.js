import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createServer } from "node:http";
const app = new Hono();
serve({
  createServer,
  fetch: app.fetch,
  port: 4e3
});
