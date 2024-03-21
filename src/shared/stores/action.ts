import { DiscoverMovieRequest, DiscoverTvRequest } from "moviedb-promise";

export const SET_DISCOVER_MOVIE = 'SET_DISCOVER_MOVIE';
export const SET_DISCOVER_TV = 'SET_DISCOVER_TV';

export const setDiscover = (media_type: 'movie' | 'tv', discoverObj: DiscoverMovieRequest | DiscoverTvRequest) => {
  return {
    type: media_type === 'movie' ? SET_DISCOVER_MOVIE : SET_DISCOVER_TV,
    discover: discoverObj,
  };
};