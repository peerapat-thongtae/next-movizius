import { discoverMovie$, searchMovies$, searchPerson$, searchTV$, mediaInfo$ } from "@/services/observable"
import TMDBService from "@/services/tmdb-service"
import { useEffect, useMemo, useState } from "react"
import { catchError, delay, finalize, of } from "rxjs"

export const useDiscoverMedia = () => {
  const [medias, setMedias] = useState<any>({})
  const [page, setPage] = useState<number>(1)
  const [searchParam, setSearchParam] = useState<any>({})
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    // console.log(typeof accountMedias$('movie', 'watchlist').subscribe((resp) => setMovies(resp)))
    setLoading(true)
    discoverMovie$({ ...searchParam, page }).pipe(
      finalize(() => {
        setLoading(false)
      })
    ).subscribe((resp: any) => setMedias(resp))
  }, [page, searchParam])

  return { medias, page, setPage, searchParam, setSearchParam, isLoading, isError }
}

export const useMediaDetail = (id: string, mediaType: string) => {
  const [media, setMedia] = useState<any>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    if(id) {
      mediaInfo$(mediaType, id).pipe(
        catchError(() => {
          return of(null)
        }),
        finalize(() => {
          setLoading(false)
        })
      ).subscribe({
        next: (resp) => {
          setMedia(resp)
        },
        error: (err) => {
          setIsError(true)
        }
      })
    }
  }, [id])

  return { media, isLoading, isError }
}

export const useSearch = (searchString: string, searchType: 'tv' | 'movie' | 'person' | 'multi' = 'multi') => {
  const [medias, setMedias] = useState<any>({})
  const [page, setPage] = useState<number>(1)
  const [searchParam, setSearchParam] = useState<any>({ query: searchString })
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const searchFn = useMemo(() => {
    if(searchType === 'movie') {
      return searchMovies$
    } else if(searchType === 'tv') {
      return searchTV$
    } else {
      return searchPerson$
    }
  }, [])

  const fetch = () => {
    setLoading(true)
    searchFn({ query: searchString, page }).pipe(
      finalize(() => {
        setLoading(false)
      })
    ).subscribe((resp: any) => setMedias(resp))
  }

  useEffect(() => {
    fetch()
  }, [page, searchString])
   
  return { medias, page, setPage, searchParam, setSearchParam, isLoading, isError, fetch }
}