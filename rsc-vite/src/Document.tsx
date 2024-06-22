import type { FC, ReactNode } from "react";

export namespace Document {
  export type Props = {
    children: ReactNode;
  };
}

export const Document: FC<Document.Props> = ({
                                               children,
                                             }) => (
  <html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Coco's blog</title>
  </head>
  <body>
  {children}
  </body>
  </html>
);