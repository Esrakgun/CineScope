import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import type { Movie } from '../../../types/movie';

interface Props {
  title: string;
  movies: Movie[];
}

const MovieList: FC<Props> = ({ title, movies }) => {
  if (!movies || movies.length === 0) return <p>Film bulunamadı.</p>;

  return (
    <div className="my-10">
      <h3 className="text-4xl font-bold mb-4">{title}</h3>

      <Splide
        options={{
          perPage: 6,
          gap: '1rem',
          pagination: false,
          arrows: true,
          type: 'loop',  // burası değişti
          breakpoints: {
            1024: { perPage: 3 },
            768: { perPage: 2 },
            480: { perPage: 1 },
          },
        }}
        aria-label={`${title} filmleri`}
      >
        {movies.map(movie => (
          <SplideSlide key={movie.id} className="cursor-pointer">
            <Link to={`/movie/${movie.id}`} className="block">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : '/images/fallback-poster.png'
                }
                alt={movie.title || movie.original_title || 'Film'}
                className="rounded-lg shadow-md w-[250px] h-[375px] object-cover hover:scale-105 transition-transform"
              />
              <p className="mt-2 text-center text-md font-semibold text-white text-2xl">
                {movie.title || movie.original_title || 'Başlık yok'}
              </p>
            </Link>
          </SplideSlide>
        ))}
      </Splide>

    </div>
  );
};

export default MovieList;
