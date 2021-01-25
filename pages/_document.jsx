import Document, { Html, Head, Main, NextScript } from "next/document";
import { SITE_NAME } from "../lib/constants";

export const config = {
  unstable_runtimeJS: false,
};

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <meta name="description" content={SITE_NAME} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
