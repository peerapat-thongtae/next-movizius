import { discoverMovie$ } from "@/services/observable"
import { useEffect, useState } from "react"
import { delay, finalize } from "rxjs"

export const useDiscoverMedia = () => {
  const [medias, setMedias] = useState<any>({})
  const [page, setPage] = useState<number>(1)
  const [searchParam, setSearchParam] = useState<any>({})
  const [isLoading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    // console.log(typeof accountMedias$('movie', 'watchlist').subscribe((resp) => setMovies(resp)))
    setLoading(true)
    discoverMovie$({ ...searchParam, page }).pipe(
      finalize(() => {
        setLoading(false)
      })
    ).subscribe((resp: any) => setMedias(resp))
  }, [page, searchParam])

  return { medias, page, setPage, searchParam, setSearchParam, isLoading }
}