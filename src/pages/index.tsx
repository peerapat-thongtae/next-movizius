import Image from "next/image";
import { Inter } from "next/font/google";
import { useAuth } from "@/shared/hocs/AuthProvider";
import Head from "next/head";
import { useEffect, useState } from "react";
import { accountMedias$, discoverMovie$ } from "@/services/observable";
import MediaCard from "@/components/media/MediaCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [movies, setMovies] = useState<any>({})
  useEffect(() => {
    // console.log(typeof accountMedias$('movie', 'watchlist').subscribe((resp) => setMovies(resp)))
    discoverMovie$({}).subscribe((resp: any) => setMovies(resp))
  }, [])
  return (
    <>
      <Head>
        <title>Movizius</title>
      </Head>
      <div className="grid grid-cols-5 gap-8 p-12">
        {
          movies?.results && movies.results.map((movie: any, index: number) => {
            return <MediaCard key={index} item={movie} media-type="movie" />
          })
        }
      </div>
    </>
  );
}
