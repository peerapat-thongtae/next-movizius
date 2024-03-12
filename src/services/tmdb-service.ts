import { MovieDb } from 'moviedb-promise'

import tmdbAPI from './tmdbAPI'

import {
  TMDB_API_KEY,
  TMDB_API_BASE_URL,
  TMDB_API_READ_ACCESS_TOKEN
} from '@/shared/config/tmdb';
import { loadState } from '@/shared/helpers/localStorage';

// let tmdbClass = new MovieDb(import.meta.env.VITE_APP_TMDB_KEY);
// tmdbClass.sessionId = localStorage.getItem("session_id") || "";

// const sessionId = localStorage.getItem("session_id") || "";
class TMDBService extends MovieDb {
  private accountId = ''
  constructor() {
    super(TMDB_API_KEY || '')

    this.sessionId = loadState()?.session_id || ''
    this.accountId = loadState()?.account_id || ''

  }

  async getMoviesWatchlist(filter: any) {
    const response = await tmdbAPI.get(
      `/4/account/${this.accountId}/movie/watchlist`,
      {
        params: filter || { page: 1, sort_by: 'created_at.desc' },
      },
    )

    return response.data
  }

  async getMoviesRated(filter: any) {
    const response = await tmdbAPI.get(
      `/4/account/${this.accountId}/movie/rated`,
      {
        params: filter || { page: 1, sort_by: 'created_at.desc' },
      },
    )

    return response.data
  }

  async getTVWatchlist(filter: any) {
    const response = await tmdbAPI.get(
      `/4/account/${this.accountId}/tv/watchlist`,
      {
        params: filter || { page: 1, sort_by: 'created_at.desc' },
      },
    )

    return response.data
  }

  async getTVRated(filter: any) {
    const response = await tmdbAPI.get(
      `/4/account/${this.accountId}/tv/rated`,
      {
        params: filter || { page: 1, sort_by: 'created_at.desc' },
      },
    )

    return response.data
  }

  async getAllMovieWatchlists() {
    const movieWatchlistResponse = await this.getMoviesWatchlist({})

    const allResult = []
    for (let i = 1; i <= movieWatchlistResponse.total_pages; i++) {
      const res = await this.getMoviesWatchlist({
        page: i,
        sort_by: 'created_at.desc',
      })

      allResult.push(res.results)
    }

    return allResult
  }

  async addToWatchlist(mediaType: string, mediaId: any, status: boolean) {
    const response = await tmdbAPI.post(
      `/3/account/${this.accountId}/watchlist`,
      {
        media_id: mediaId,
        media_type: mediaType,
        watchlist: status,
      },
    )

    return response.data
  }
}

export default TMDBService
