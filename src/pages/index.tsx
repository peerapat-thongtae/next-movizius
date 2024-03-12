import Image from "next/image";
import { Inter } from "next/font/google";
import { useAuth } from "@/shared/hocs/AuthProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import { accountMedias$, discoverMovie$ } from "@/services/observable";
import MediaCard from "@/components/media/MediaCard";
import MediaGrid from "@/components/media/MediaGrid";
import { useDiscoverMedia } from "@/shared/hooks/useMedia";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { medias, page, setPage, isLoading } = useDiscoverMedia()
  return (
    <>
      <Head>
        <title>Movizius</title>
      </Head>
      <div>
        <MediaGrid 
          isLoading={isLoading} 
          items={medias?.results} 
          totalResults={medias?.total_results} 
          totalPages={medias?.total_pages} 
          page={page} 
          setPage={setPage} />
      </div>
    </>
  );
}
