// import * as React from "react";const Detail: React.FC = () => {
import { useParams, useNavigate } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../../redux/api';
import Error from '../../components/Error';
import Loader from '../../components/Loader';
import Banner from './Banner';
import Content from './Content';
import ActorList from './ActorList';
import VideoList from './VideoList';
import { RiArrowLeftSLine } from 'react-icons/ri';
import AddButton from '../../components/AddButton';

const Detail: React.FC = () => {
  // URL'den film id'sini al
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // API'den film detaylarını çek
  const { data: movie, error, isLoading } = useGetMovieByIdQuery({ id: id ?? '' });

  if (error) return <Error message="Film bilgileri yüklenirken hata oluştu." />;
  if (isLoading || !movie) return <Loader />;

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen p-6 rounded-lg">
      {/* Geri dön ve izleme listesi butonları */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex gap-2 items-center py-2 px-5 bg-gray-700 rounded-md hover:bg-gray-600 transition"
        >
          <RiArrowLeftSLine className="text-xl" />
          <span>Geri</span>
        </button>

        <AddButton movie={movie} />
      </div>

      {/* Film afişi */}
      <Banner movie={movie} />

      {/* Film içeriği */}
      <Content movie={movie} />

      {/* Oyuncu listesi */}
      <ActorList cast={movie.credits.cast} />

      {/* Video listesi (fragman vb.) */}
      <VideoList id={movie.id.toString()} />
    </div>
  );
};

export default Detail;
