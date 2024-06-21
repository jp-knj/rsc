import { PassThrough, Readable } from "node:stream";
import { type FC, type ReactNode, use } from "react";
import { createFromNodeStream } from "react-server-dom-webpack/client.node";
import { renderToPipeableStream } from "react-dom/server";

import { manifest } from "./RscRuntimeClient.js";


/*
 * Takes the RSC payload stream and transforms it to HTML for SSR. We are able
 * to do this in the same process as our Node server thanks to Vite. We use Vite
 * to load this module with the correct conditions.
 */
export function renderToHtml(rscPayload: Readable): Readable {
  const promise = createFromNodeStream<ReactNode>(rscPayload, manifest);
  const Async: FC = () => use(promise);
  const { pipe } = renderToPipeableStream(<Async />);

  return pipe(new PassThrough());
}