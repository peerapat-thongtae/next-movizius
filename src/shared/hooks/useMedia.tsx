import { discoverMedia$, searchMovies$, searchPerson$, searchTV$, mediaInfo$ } from "@/services/observable"
import { useEffect, useMemo, useState } from "react"
import { catchError, delay, finalize, from, map, of } from "rxjs"
import { getTitleDetailsByIMDBId } from "movier"
import { useDispatch, useSelector } from "react-redux";
import { setDiscover } from "@/shared/stores/action";
import { DiscoverMedia, DiscoverState } from "../stores/reducer"

export const useDiscoverMedia = (mediaType: "movie" | "tv", initialSearchParam?: any) => {
  const dispatch = useDispatch();
  const initialParam = useSelector((state: DiscoverState) => {
    if(mediaType === 'movie') {
      return state.movie
    } else {
      return state.tv
    }
  })
  const defaultPage = initialParam?.page
  
  const [medias, setMedias] = useState<any>({})
  const [page, setPage] = useState<number>(defaultPage || 1)
  const [searchParam, setSearch] = useState<DiscoverMedia>({
    ...initialSearchParam,
    ...initialParam,
  })
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const setSearchParam = (param: any) => {
    setSearch(param)
    setPage(1)
  }

  const handleDiscover = () => {
    setLoading(true)
    discoverMedia$(mediaType, { ...searchParam, page }).pipe(
      finalize(() => {
        setLoading(false)
      })
    ).subscribe((resp: any) => setMedias(resp))

    dispatch(setDiscover(mediaType, { ...searchParam, page: page }));
  }

  // useEffect(() => {
  //   setPage(1)
  // }, [searchParam])

  useEffect(() => {
    handleDiscover()
  }, [page, searchParam, mediaType])

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

export const useIMDB = (imdbId: string, mediaType: string, disabled = false) => {
  const [response, setResponse] = useState<any>({})
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)


  const fetch = () => {
    if(!imdbId) {
      return;
    }
    if(disabled) {
      // setResponse({})
      return;
    }
    setLoading(true)
    from(getTitleDetailsByIMDBId(imdbId)).pipe(
      catchError(() => of(null)),
      map(resp => ({
        ...resp,
        vote_average: resp?.mainRate?.rate,
        vote_count: resp?.mainRate?.votesCount,
      })),
      finalize(() => {
        setLoading(false)
      }),
    ).subscribe({
      next: (resp) => {
        setResponse(resp)
      }
    })
  }

  useEffect(() => {
    fetch()
  }, [imdbId])

  return { response, isLoading, isError, fetch }
}