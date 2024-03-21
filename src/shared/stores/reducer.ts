import { DiscoverMovieRequest, DiscoverTvRequest } from 'moviedb-promise';
import { SET_DISCOVER_MOVIE, SET_DISCOVER_TV } from './action';

export interface DiscoverState {
  movie?: DiscoverMedia,
  tv?: DiscoverMedia,
}

export type DiscoverMedia = DiscoverMovieRequest | DiscoverTvRequest

const initialStateDiscover: DiscoverMedia = {
  page: 1,
  sort_by: 'popularity.desc',
  "vote_average.gte": 0,
  "vote_average.lte": 10,
  'release_date.gte': '',
  'release_date.lte': ''
};

const initialState: DiscoverState = {
  movie: initialStateDiscover,
  tv: initialStateDiscover,
}

export function discoverReducer(
  state = initialState,
  action: any,
): DiscoverState {
  switch (action.type) {
  case SET_DISCOVER_MOVIE:
    return { ...state, movie: { ...state.movie, ...action.discover }}
  case SET_DISCOVER_TV:
    return { ...state, tv: { ...state.tv, ...action.discover }}
  default:
    return state;
  }
}
