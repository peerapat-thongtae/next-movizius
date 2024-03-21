import "@/styles/globals.css";
import '@/assets/css/loading.css'
import NextNProgress from 'nextjs-progressbar';

// import "@/assets/css/base.css"
// import "@/assets/css/main.css"
// import "@/assets/css/tailwindcss.css"
import type { AppProps } from "next/app";
import { Tooltip } from 'react-tooltip'
import { AuthProvider, useAuth } from '@/shared/hocs/AuthProvider';
import Navbar from "@/components/common/Nav";
import Head from "next/head";
import router from "next/router";
import { useEffect } from "react";
import 'react-modal-video/scss/modal-video.scss';
import { Provider } from "react-redux";
import store from '@/shared/stores/store'

export default function App({ Component, pageProps }: AppProps) {
  const { isPending } = useAuth()
  return (
    <>
      <Provider store={store}>
        <NextNProgress color="#FFEB3B" startPosition={0.3} stopDelayMs={200} height={6} showOnShallow={true} />
        <AuthProvider>
          <Head>
            <title>Movizius</title>
          </Head>
          <div className="bg-main flex min-h-screen flex-col">
            <div className="w-full antialiased">
              <Navbar />
            </div>
            <div className="grow text-white">
              {!isPending && <Component {...pageProps} />}
            </div>
          </div>
        </AuthProvider>
      </Provider>
    </>
  );
}
