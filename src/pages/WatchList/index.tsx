import * as React from 'react';
import { useGetWatchListQuery, useToggleWatchListMutation } from '../../redux/api';
import { IMAGE_BASE_URL, FALLBACK_IMAGE } from '../../constants';
import { Movie } from '../../types/movie';

const WatchList: React.FC = () => {
  const { data, isLoading, error } = useGetWatchListQuery();
  const [toggleWatch, { isLoading: isToggling }] = useToggleWatchListMutation();

  const handleRemove = async (movieId: number) => {
    try {
      await toggleWatch({ movieId, isAdd: false }).unwrap();
    } catch (err) {
      console.error('Film çıkarılamadı:', err);
    }
  };

  if (isLoading) return <p className="text-white">Yükleniyor...</p>;
  if (error) return <p className="text-red-500">Bir hata oluştu. Lütfen tekrar deneyin.</p>;
  if (!data?.results.length) return <p className="text-white">Listede henüz film yok.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-white">📺 İzleme Listem</h1>

      <ul className="space-y-4">
        {data.results.map((movie: Movie) => (
          <li
            key={movie.id}
            className="flex justify-between items-center bg-gray-800 text-white rounded p-3 shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : FALLBACK_IMAGE}
                alt={movie.title}
                className="w-16 h-24 object-cover rounded"
              />
              <span className="font-semibold">{movie.title}</span>
            </div>

            <button
              onClick={() => handleRemove(movie.id)}
              disabled={isToggling}
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm transition disabled:opacity-50"
            >
              Çıkar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
