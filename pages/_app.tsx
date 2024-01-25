import Head from "next/head";
import type { AppProps } from "next/app";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"] });
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={urbanist.className}>
      <Head>
        <title>Campground Tycoon</title>
      </Head>

      <MantineProvider defaultColorScheme='dark'>
        <Component {...pageProps} />
      </MantineProvider>
    </main>
  );
}

export default App;
