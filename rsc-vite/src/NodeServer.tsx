import { serve } from "@hono/node-server";
import { type Context, type Next, Hono } from "hono";
import { createServer as createHttpServer } from "node:http";
import { PassThrough, Readable } from "node:stream";
import { renderToPipeableStream } from "react-server-dom-webpack/server";

import { Document } from "./Document.tsx";
import { manifest } from "./RscRuntimeServer.js";
import * as Vite from "./ViteRuntime.ts";

const Client = await Vite.runtime.executeUrl("./NodeClient.tsx");

const app = new Hono();

app.get("*", ssr);

const createServer = ((options: any, listener: any) => {
  return createHttpServer(options, (req, res) =>
    Vite.server.middlewares.handle(req, res, () => listener?.(req, res))
  );
});

function ssr(context: Context, _next: Next) {
  const document = (
    <Document>
      Hello world!
    </Document>
  );

  const { pipe } = renderToPipeableStream(document, manifest);
  const rscPayload = pipe(new PassThrough());

  const html = Readable.toWeb(Client.renderToHtml(rscPayload));

  context.header("Content-Encoding", "gzip");
  context.header("Content-Type", "text/html; charset=UTF-8");
  return context.newResponse(html.pipeThrough(new CompressionStream("gzip")));
}

const server = serve({
  createServer,
  fetch: app.fetch,
  port: 4000
});