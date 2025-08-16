import { type PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>uacl-bd</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Layout>
          <Component />
        </Layout>
      </body>
    </html>
  );
}
