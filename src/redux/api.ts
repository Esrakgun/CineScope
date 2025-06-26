import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  MovieResponse,
  MovieDetail,
  Video,
} from '../types/movie';
import { API_LANGUAGE } from '../constants';

// API Key ve diğer değişkenler
const API_KEY = import.meta.env.VITE_API_KEY;
const SESSION_ID = import.meta.env.VITE_SESSION_ID;
const ACCOUNT_ID = 21861021;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => {
      headers.set('accept', 'application/json');
      headers.set('Authorization', `Bearer ${API_KEY}`);
      return headers;
    },
  }),
  tagTypes: ['WatchList'],
  endpoints: (builder) => ({
    getTopRated: builder.query<MovieResponse, void>({
      query: () => `movie/top_rated?${API_LANGUAGE}`,
    }),
    getPopular: builder.query<MovieResponse, void>({
      query: () => `movie/popular?${API_LANGUAGE}`,
    }),
    getTrending: builder.query<MovieResponse, void>({
      query: () => `trending/movie/week?${API_LANGUAGE}`,
    }),
    getMoviesByGenre: builder.query<MovieResponse, number>({
      query: (genreId) => `discover/movie?with_genres=${genreId}&${API_LANGUAGE}`,
    }),
    getMovieById: builder.query<MovieDetail, { id: string; language?: string }>({
      query: ({ id, language = 'tr' }) =>
        `movie/${id}?append_to_response=videos,credits&language=${language}`,
    }),
    getMovieVideos: builder.query<{ results: Video[] }, string>({
      query: (movieId) => `movie/${movieId}/videos?language=tr-TR`,
    }),
    getWatchList: builder.query<MovieResponse, void>({
      query: () =>
        `/account/${ACCOUNT_ID}/watchlist/movies?${API_LANGUAGE}&session_id=${SESSION_ID}`,
      providesTags: ['WatchList'],
    }),
    toggleWatchList: builder.mutation<void, { movieId: number; isAdd: boolean }>({
      query: ({ movieId, isAdd }) => ({
        url: `/account/${ACCOUNT_ID}/watchlist?session_id=${SESSION_ID}`,
        method: 'POST',
        body: {
          media_type: 'movie',
          media_id: movieId,
          watchlist: isAdd,
        },
      }),
      invalidatesTags: ['WatchList'],
    }),
    getSearchMovies: builder.query<MovieResponse, string>({
      query: (term) =>
        `search/movie?query=${encodeURIComponent(term)}&${API_LANGUAGE}`,
    }),
  }),
});

export const {
  useGetTopRatedQuery,
  useGetPopularQuery,
  useGetTrendingQuery,
  useGetMoviesByGenreQuery,
  useGetMovieByIdQuery,
  useGetMovieVideosQuery,
  useGetWatchListQuery,
  useToggleWatchListMutation,
  useGetSearchMoviesQuery,
} = movieApi;
