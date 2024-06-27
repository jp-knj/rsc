/*
 * entry point for our client application in node.
 * "client runtime" as far as React is concerned. Because it is a client runtime,
 * it can render client components but not server components.
 */
import { PassThrough, Readable } from "node:stream";
import { type FC, type ReactNode, use } from "react";
import { createFromNodeStream } from "react-server-dom-webpack/client.node";
import { renderToPipeableStream } from "react-dom/server";

import { manifest } from "./RscRuntimeClient.ts";

export function renderToHtml(rscPayload: Readable): Readable {
  const promise = createFromNodeStream<ReactNode>(rscPayload, manifest);
  const Async: FC = () => use(promise);
  const { pipe } = renderToPipeableStream(<Async />);

  return pipe(new PassThrough());
}