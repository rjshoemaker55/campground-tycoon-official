import { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript } from "@mantine/core";

export default function Document() {
  return (
    <Html>
      <Head>
        <link href='https://fonts.googleapis.com/css2?family=Open+Sans&display=swap' rel='stylesheet' />
        <ColorSchemeScript defaultColorScheme='dark' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
