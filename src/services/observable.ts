import { forkJoin, from, map, mergeMap, of } from 'rxjs'
import TMDBService from './tmdb-service'
import { MovieResultsResponse, TvResultsResponse } from 'moviedb-promise'

const tmdb = new TMDBService()
export const mediaInfo$ = (media_type: string, id: any, imdbData = false) => {
  if (media_type === 'tv') {
    return from(tmdb.tvInfo({ id: id || '', append_to_response: 'account_states,external_ids,casts,crew,recommendations,similar,belongs_to_collection,watch-providers' })).pipe(
      map((resp: any) => {
        return {
          ...resp,
          imdb_id: resp.imdb_id || resp?.external_ids?.imdb_id,
          media_type,
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
    return from(tmdb.movieInfo({ id: id || '', append_to_response: 'account_states,external_ids,casts,crew,recommendations,similar,belongs_to_collection,watch-providers' })).pipe(
      map((resp: any) => {
        return {
          ...resp,
          imdb_id: resp.imdb_id || resp?.external_ids?.imdb_id,
          media_type,
        }
      }),
    )
  }
}

export const discoverMovie$ = (searchParam: any) => {
  return from(tmdb.discoverMovie()).pipe(
    mergeMap((resp) => {
      return handleMediaInfo(resp, 'movie')
    }),
  )
}

export const accountMedias$ = (mediaType: string, status: string, paging?: any) => {
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
    )
}

const handleMediaInfo = (resp: any, mediaType: string) => {
  const mediasInfo = resp?.results?.map((media: any) => mediaInfo$(mediaType, media.id)) || []
  if (mediasInfo.length > 0) {
    return forkJoin(mediasInfo).pipe(
      map((resMov: any) => ({
        ...resp,
        results: resMov?.map((val: any) => ({
          ...val,
          media_type: mediaType,
        })),
      })),
    )
  }
  else {
    return of({
      ...resp,
    })
  }
}