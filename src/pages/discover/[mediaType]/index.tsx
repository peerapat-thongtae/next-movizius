import Image from "next/image";
import { Inter } from "next/font/google";
import { useAuth } from "@/shared/hocs/AuthProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import MediaCard from "@/components/media/MediaCard";
import MediaGrid from "@/components/media/MediaGrid";
import { useDiscoverMedia } from "@/shared/hooks/useMedia";
import DiscoverAccordion from "@/components/media/DiscoverAccordion";
import { useRouter } from "next/router";

// const inter = Inter({ subsets: ["latin"] });

export default function Discover(props: any) {
  const router = useRouter()
  const type = props.mediaType
  const { medias, page, setPage, isLoading, searchParam, setSearchParam } = useDiscoverMedia(type as any)
  return (
    <>
      <Head>
        <title>Discover</title>
      </Head>
      <div className="p-12 mt-24">
        <div className="flex gap-8">
          <div className="w-[24rem] min-w-[24rem] h-auto">
            <div className=" ">
              <DiscoverAccordion searchParam={searchParam} setSearchParam={setSearchParam} />
            </div>
          </div>
          <MediaGrid
            gridCols={4}
            size={'AUTO'}
            isLoading={isLoading} 
            items={medias?.results} 
            totalResults={medias?.total_results} 
            totalPages={medias?.total_pages} 
            page={page} 
            setPage={setPage} />
        </div>
        
      </div>
    </>
  );
}

Discover.getInitialProps = async ({ query }: any) => {
  const {mediaType} = query

  return {mediaType}
}
