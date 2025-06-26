import * as React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useGetSearchMoviesQuery } from '../../redux/api';
import type { Movie } from '../../types/movie';

  const truncate = (text: string, maxLength: number = 120): string =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  const SearchResults: React.FC = () => {
  const [params] = useSearchParams();
  const query = params.get('query') || '';

  const { data, isLoading, error } = useGetSearchMoviesQuery(query);

  if (!query) return <p className="text-center text-gray-500">Lütfen bir arama yapın.</p>;
  if (isLoading) return <p className="text-center">Yükleniyor...</p>;
  if (error) return <p className="text-center text-red-500">Bir hata oluştu.</p>;

  return (
    <div className="px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">“{query}” için arama sonuçları</h2>

      {data?.results?.length === 0 && (
        <p className="text-center text-gray-500">Sonuç bulunamadı.</p>
      )}

      {data?.results?.length === 1 ? (
        <div className="flex justify-center">
          <Link
            to={`/movie/${data.results[0].id}`}
            className="bg-white rounded shadow p-4 hover:shadow-lg transition w-full max-w-sm flex flex-col items-center text-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`}
              alt={data.results[0].title || 'Film posteri'}
              className="mb-3 rounded max-w-xs mx-auto"
            />
            <h3 className="font-bold text-lg text-black">{data.results[0].title}</h3>
            <p className="text-sm text-gray-500 mt-1">{data.results[0].release_date}</p>
            <p className="text-yellow-600 font-semibold mt-1">
              ⭐ {data.results[0].vote_average.toFixed(1)}
            </p>
            <p className="text-gray-700 mt-2 text-sm">{truncate(data.results[0].overview || 'Özet yok')}</p>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
          {data?.results?.map((movie: Movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="bg-white rounded shadow p-4 hover:shadow-lg transition max-w-xs mx-auto flex flex-col items-center"
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || 'Film posteri'}
                   className="mb-3 rounded h-full" 
                />
              ) : (
                <div className="bg-gray-300 w-full h-64 flex items-center justify-center mb-3 text-gray-600">
                  Poster yok
                </div>
              )}

              <h3 className="font-bold text-lg text-center text-black">{movie.title}</h3>

              {movie.original_title && movie.original_title !== movie.title && (
                <p className="text-sm italic text-center text-gray-600">{movie.original_title}</p>
              )}

              <p className="text-sm text-gray-500 mt-1">{movie.release_date}</p>

              <p className="text-yellow-600 font-semibold mt-1">⭐ {movie.vote_average.toFixed(1)}</p>

              <p className="text-gray-700 mt-2 text-sm text-center">
                {truncate(movie.overview || 'Özet yok')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
