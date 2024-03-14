import "@/styles/globals.css";
import '@/assets/css/loading.css'

// import "@/assets/css/base.css"
// import "@/assets/css/main.css"
// import "@/assets/css/tailwindcss.css"
import type { AppProps } from "next/app";
import { Tooltip } from 'react-tooltip'
import { AuthProvider, useAuth } from '@/shared/hocs/AuthProvider';
import Navbar from "@/components/common/Navbar";
import Head from "next/head";
import router from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { isPending } = useAuth()
  return (
    <AuthProvider>
      <Head>
        <title>Movizius</title>
      </Head>
      <div className="bg-main flex min-h-screen flex-col">
        <div className="w-full px-4 antialiased">
          {/* {props.meta} */}
          <Navbar />
        </div>
        <div className="grow text-white">
          {!isPending && <Component {...pageProps} />}
        </div>
      </div>
    </AuthProvider>
  );
}
