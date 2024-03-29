import { catchError, forkJoin, from, map, mergeMap, of } from 'rxjs'
import TMDBService from './tmdb-service'
import { MovieResultsResponse, TvResultsResponse } from 'moviedb-promise'
import { useAuth } from '@/shared/hocs/AuthProvider'

export const mediaInfo$ = (media_type: string, id: any, imdbData = false) => {
  const tmdb = new TMDBService()

  const accountStatus = (acc: any) => {
    if(!acc) {
      return ''
    }
    if (acc.watchlist === true)
      return 'watchlist'
    else if (acc.rated)
      return 'watched'
    else
      return ''
  }

  const getDirectors = (crews: any) => {
    return crews ? crews.filter((val: any) => val.known_for_department === 'Directing' && val.job === 'Director') : []
  }

  const getWriters = (crews: any) => {
    return crews ? crews.filter((val: any) => val.job === 'Writer' || val.job === 'Novel' ) : []
  }

  const getTrailers = (videos: any) => {
    const trailers = videos?.results?.filter((video: any) => video.type === "Trailer") || []

    if(trailers.length === 0) {
      return videos?.results?.filter((video: any) => video.type === "Teaser") || []
    }

    return trailers;
  }

  const releaseDateTH = (releaseDates: any) => {
    const dateResults = releaseDates?.results || []
    const findTH = dateResults.find((val: any) => val.iso_3166_1 === 'TH')
    return findTH?.release_dates?.[0]?.release_date
  }

  if (media_type === 'tv') {
    return from(tmdb.tvInfo({ id: id || '', append_to_response: 'account_states,external_ids,casts,crew,recommendations,similar,belongs_to_collection,watch-providers,videos,release_dates' })).pipe(
      map((resp: any) => {
        return {
          ...resp,
          imdb_id: resp.imdb_id || resp?.external_ids?.imdb_id,
          account_status: accountStatus(resp?.account_states),
          media_type,
          directors: getDirectors(resp?.casts?.crew),
          writers: getWriters(resp?.casts?.crew),
          trailers: getTrailers(resp?.videos),
          // release_date:
        }
      }),
    )
  }
  else if (media_type === 'person') {
    return from(tmdb.personInfo({ id: id || '' })).pipe(
      map((resp: any) => {
        return {
          ...resp,
          imdb_id: resp.imdb_id || resp?.external_ids?.imdb_id,
          media_type,
        }
      }),
    )
  }
  else {
    return from(tmdb.movieInfo({ id: id || '', append_to_response: 'account_states,external_ids,casts,crew,recommendations,similar,belongs_to_collection,watch-providers,videos,release_dates' })).pipe(
      map((resp: any) => {
        return {
          ...resp,
          imdb_id: resp.imdb_id || resp?.external_ids?.imdb_id,
          account_status: accountStatus(resp?.account_states),
          media_type,
          directors: getDirectors(resp?.casts?.crew),
          writers: getWriters(resp?.casts?.crew),
          trailers: getTrailers(resp?.videos),
          release_date: resp.release_date,
          release_date_th: releaseDateTH(resp.release_dates),
        }
      }),
    )
  }
}

export const searchMovies$ = (searchParam: any) => {
  const tmdb = new TMDBService()

  return from(tmdb.searchMovie(searchParam)).pipe(
    mergeMap((resp) => {
      return handleMediaInfo(resp, 'movie')
    }),
  )
}

export const searchTV$ = (searchParam: any) => {
  const tmdb = new TMDBService()

  return from(tmdb.searchTv(searchParam)).pipe(
    mergeMap((resp) => {
      return handleMediaInfo(resp, 'tv')
    }),
  )
}

export const searchPerson$ = (searchParam: any) => {
  const tmdb = new TMDBService()

  return from(tmdb.searchPerson(searchParam)).pipe(
    mergeMap((resp) => {
      return handleMediaInfo(resp, 'person')
    }),
  )
}

export const discoverMedia$ = (mediaType: string, searchParam: any) => {
  const tmdb = new TMDBService()

  if(mediaType === 'movie') {
    return from(tmdb.discoverMovie(searchParam)).pipe(
      mergeMap((resp) => {
        return handleMediaInfo(resp, mediaType)
      }),
    )
  } else {
    return from(tmdb.discoverTv(searchParam)).pipe(
      mergeMap((resp) => {
        return handleMediaInfo(resp, mediaType)
      }),
    )
  }
  
}

export const accountMedias$ = (mediaType: string, status: string, paging?: any) => {
  const tmdb = new TMDBService()

  const sort_by = (paging?.sort_by || 'created_at.desc') as 'created_at.desc' | 'created_at.asc'
  const page = (paging?.page || 1)
  let api: Promise<MovieResultsResponse | TvResultsResponse> = tmdb.accountMovieWatchlist({ page: page, sort_by })
  if (mediaType === 'movie') {
    if (status === 'watchlist')
      api = tmdb.accountMovieWatchlist({ page: page, sort_by })
    else if (status === 'watched')
      api = tmdb.accountRatedMovies({ page: page, sort_by })
  }
  else {
    if (status === 'watchlist')
      api = tmdb.accountTvWatchlist({ page: page, sort_by })
    else if (status === 'watched')
      api = tmdb.accountRatedTv({ page: page, sort_by })
  }
  return from(api)
    .pipe(
      mergeMap((resp) => {
        return handleMediaInfo(resp, mediaType)
      }),
      catchError((err) => {
        return err
      })
    )
}

const handleMediaInfo = (resp: any, mediaType: string) => {
  const mediasInfo = resp?.results?.map((media: any) => mediaInfo$(mediaType, media.id).pipe(
    catchError(() => of(null)),
  ),
  ) || []
  if (mediasInfo.length > 0) {
    return forkJoin(mediasInfo).pipe(
      map((resMov: any) => {
        if(resMov) {
          return {
            ...resp,
            results: resMov?.map((val: any) => ({
              ...val,
              media_type: mediaType,
            })),
          }
        }
      }),
      
    )
  }
  else {
    return of({
      ...resp,
    })
  }
}

export const getScheduleMovie = (release_date: string, country: string = 'TH') => {
  const tmdb = new TMDBService()

  return from(tmdb.discoverMovie({ region: country, "release_date.gte": release_date, "release_date.lte": release_date })).pipe(
    mergeMap((resp) => {
      return handleMediaInfo(resp, 'movie')
    }),
  )
}