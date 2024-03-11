import "@/styles/globals.css";
// import "@/assets/css/base.css"
// import "@/assets/css/main.css"
// import "@/assets/css/tailwindcss.css"
import type { AppProps } from "next/app";
import { AuthProvider, useAuth } from '@/shared/hocs/AuthProvider';
import Navbar from "@/components/common/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const { isPending } = useAuth()
  return (
    <AuthProvider>
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
