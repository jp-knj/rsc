import type { SSRManifest } from "react-server-dom-webpack/client.node";

import * as Components from "./ClientComponents.js";

globalThis.__webpack_require__ = (_chunk) => Components;

export const manifest: SSRManifest = {
  moduleMap: new Proxy(
    {},
    {
      get(_target, prop0) {
        return new Proxy(
          {},
          {
            get(_target, prop1) {
              return {
                id: prop0,
                chunks: [prop0],
                name: prop1
              };
            }
          }
        );
      }
    }
  ),
  moduleLoading: {
    prefix: ""
  }
};