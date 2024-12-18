import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
import AppBar  from "../components/AppBar";
import Footer  from "../components/Footer";
import Notification from "../components/Notification";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="bg-default-900">
      <Head>
        <title>Solana Token Creater</title>
      </Head>
      <ContextProvider>
        <Notification/>
        <AppBar />
        <Component {...pageProps} />
        <Footer/>
      </ContextProvider>

      {/* External JS Libraries */}
      <script src="/assets/libs/preline/preline.js" defer></script>
      <script src="/assets/libs/swiper/swiper-bundle.min.js" defer></script>
      <script src="/assets/libs/gumshoejs/gumshoe.polyfills.min.js" defer></script>
      <script src="/assets/libs/lucide/lucide.min.js" defer></script>
      <script src="/assets/libs/aos/aos.js" defer></script>
      <script src="/assets/js/swiper.js" defer></script>
      <script src="/assets/js/theme.js" defer></script>
    </div>
  );
};

export default MyApp;
