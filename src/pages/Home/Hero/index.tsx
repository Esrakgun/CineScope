import * as React from 'react';
import { useMemo } from 'react';
import { useGetPopularQuery } from '../../../redux/api';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL, FALLBACK_IMAGE } from '../../../constants';
import Loader from '../../../components/Loader';
import HomeError from '../../../components/Error/HomeError';
import AddButton from '../../../components/AddButton';

const Hero: React.FC = () => {
  const { data, error, isLoading } = useGetPopularQuery();

  const movie = useMemo(() => {
    if (!data?.results?.length) return null;
    return data.results[Math.floor(Math.random() * data.results.length)];
  }, [data]);

  if (isLoading) return <h1><Loader/></h1>;
  if (error) return <h1><HomeError message="Popüler filmler yüklenirken hata oluştu." /></h1>;
  if (!movie) return <h1>Film bulunamadı!</h1>;

  const title = movie.title || movie.original_title || 'Başlık yok';
  const overview = movie.overview || 'Açıklama yok';
  const posterSrc = movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : FALLBACK_IMAGE;
  const hasOverview = overview && overview !== 'Açıklama yok';

  return (
    <div className="w-full min-h-[900px] bg-gradient-to-r from-gray-800 via-gray-900 to-black flex justify-center items-center p-4 sm:p-6 md:p-8 mb-20 cursor-pointer ">
     <div className="w-full max-w-6xl bg-white shadow-xl overflow-hidden flex flex-col lg:flex-row gap-6 h-full">


        {/* Poster alanı */}
       <div className="w-full lg:w-5/12 flex-shrink-0">
  <img
    className="object-cover w-full h-full max-h-[600px] min-h-[400px]"
    style={{
      minWidth: hasOverview ? '280px' : '450px',
      maxWidth: '100%',
    }}
    src={posterSrc}
    alt={title}
  />
</div>


        {/* Yazı alanı */}
      <div className={`w-full lg:w-7/12 p-6 md:p-8 flex flex-col justify-center ${hasOverview ? '' : 'items-center text-center'}`}>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{title}</h2>

          {hasOverview ? (
            <>
              <p className="text-gray-700 mb-6 text-base md:text-lg">
                {overview.length > 350 ? overview.slice(0, 350) + '...' : overview}
              </p>
              <p className="mb-6">
                <span className="font-semibold text-black">IMDB:</span>{' '}
                <span className="text-yellow-500">{movie.vote_average.toFixed(1)}</span>
              </p>
              <div className="flex gap-4 mt-4">
                <Link
                  to={`/movie/${movie.id}`}
                  className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow hover:shadow-lg max-w-max"
                >
                  Film İzle
                </Link>
                <AddButton movie={movie} />
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="mb-0 font-semibold text-lg text-black">
                IMDB: <span className="text-yellow-500">{movie.vote_average.toFixed(1)}</span>
              </p>
              <div className="flex gap-4 mt-4">
                <Link
                  to={`/movie/${movie.id}`}
                  className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow hover:shadow-lg"
                >
                  Film İzle
                </Link>
                <AddButton movie={movie} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Hero);
