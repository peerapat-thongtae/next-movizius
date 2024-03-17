import TMDBService from "@/services/tmdb-service"
import { MovieAccountStateResponse, ShowAccountStatesResponse } from "moviedb-promise"
import { useEffect, useState } from "react"
import { delay, finalize, from } from "rxjs"
import { useAuth } from "../hocs/AuthProvider"


const useMediaAccountState = (media_id: number, media_type: string, disabled = false) => {
  const { isAuthenticated } = useAuth()
  const tmdb = new TMDBService()
  const [accountState, setAccountState] = useState<MovieAccountStateResponse | ShowAccountStatesResponse>({
    favorite: false,
    rated: false,
    id: media_id,
    watchlist: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    if (isAuthenticated && media_id && !disabled)
      getAccountState()
  }, [isAuthenticated, media_id])

  const getAccountState$ = () => {
    setIsLoading(true)
    const apiState = media_type === 'movie' ? tmdb.movieAccountStates(media_id) : tmdb.tvAccountStates(media_id)
    return from(apiState).pipe(
      finalize(() => {
        setIsLoading(false)
        setIsFetched(true)
      }),
    )
  }

  const addToWatchlist = async (status: boolean) => {
    setIsLoading(true)
    from(tmdb.addToWatchlist(media_type, media_id, status)).pipe(
      delay(2000),
    ).subscribe(() => {
      getAccountState()
    })
  }
 
  const addRated = async (rate: number) => {
    setIsLoading(true)
    const api = media_type === 'movie'
      ? tmdb.movieRatingUpdate({
        id: media_id,
        value: rate,
      },
      {
        params: {
          api_key: process.env.VITE_APP_TMDB_KEY,
          session_id: tmdb.sessionId,
        },
      })
      : tmdb.tvRatingUpdate({
        id: media_id,
        value: rate,
      },
      {
        params: {
          api_key: process.env.VITE_APP_TMDB_KEY,
          session_id: tmdb.sessionId,
        },
      })
    from(api).pipe(
      delay(2000),
    ).subscribe(() => {
      getAccountState()
    })
  }
 
  const getAccountState = () => {
    getAccountState$().subscribe({
      next: (resp) => {
        setAccountState(resp)
        setIsLoading(false)
        setIsFetched(true)
      },
      error: () => {
        //    alert(7)
      }
    })
  }

  return { data: accountState, isLoading, isFetched, addToWatchlist, addRated };
}

export default useMediaAccountState