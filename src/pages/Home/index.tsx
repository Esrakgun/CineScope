import * as React from "react";
import Hero from './Hero';
import MovieList from './MovieList';
import Loader from '../../components/Loader';
import HomeError from '../../components/Error/HomeError';
import { useGetTopRatedQuery, useGetPopularQuery, useGetTrendingQuery } from '../../redux/api';

const Home: React.FC = () => {
  const { data: topRated, error: topRatedError, isLoading: topRatedLoading } = useGetTopRatedQuery();
  const { data: popular, error: popularError, isLoading: popularLoading } = useGetPopularQuery();
  const { data: trending, error: trendingError, isLoading: trendingLoading } = useGetTrendingQuery();

  if (topRatedLoading || popularLoading || trendingLoading) return <Loader />;
  if (topRatedError || popularError || trendingError) return <HomeError />;

  return (
    <div>
      <Hero />

      {topRated && topRated.results.length > 0 && (
        <MovieList title="En İyi Filmler" movies={topRated.results} />
      )}

      {popular && popular.results.length > 0 && (
        <MovieList title="Popüler Filmler" movies={popular.results} />
      )}

      {trending && trending.results.length > 0 && (
        <MovieList title="Trend Filmler" movies={trending.results} />
      )}
    </div>
  );
};

export default Home;
