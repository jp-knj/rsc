import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { createServer } from "node:http";

const app = new Hono();

const server = serve({
  createServer,
  fetch: app.fetch,
  port: 4000
});