
import axios from 'axios';

import {
  TMDB_API_KEY,
  TMDB_API_BASE_URL,
  TMDB_API_READ_ACCESS_TOKEN
} from '@/shared/config/tmdb';

const tmdbAPI = axios.create({
  baseURL: TMDB_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`
  }
});

tmdbAPI.interceptors.request.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log('err', 'fuu')
  return Promise.reject(error);
});

// export {
//   alternativeTmdbAPI
// };

export default tmdbAPI;
