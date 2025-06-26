import * as React from "react";
import { useGetMovieVideosQuery } from "../../../redux/api";
import type { Video } from "../../../types/movie";
import Error from "../../../components/Error";
import NoTrailer from "../../../components/NoTrailer";  // Notrailer component importu
import ReactPlayer from "react-player";
import { Splide, SplideSlide } from "@splidejs/react-splide";

interface Props {
  id: string;
}

const VideoList: React.FC<Props> = ({ id }) => {
  const { data, error, isLoading } = useGetMovieVideosQuery(id);

  React.useEffect(() => {
    if (data?.results?.length) {
      const trailers = data.results.filter(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );

      if (trailers.length > 0) {
        console.log(`🎬 [${id}] Fragman(lar) bulundu:`);
        trailers.forEach((trailer) => {
          console.log(`▶️ ${trailer.name} → https://www.youtube.com/watch?v=${trailer.key}`);
        });
      } else {
        console.log(`📭 [${id}] Fragman bulunamadı.`);
      }
    }
  }, [data, id]);

  if (isLoading) {
    return <p className="text-center my-4">Fragmanlar yükleniyor...</p>;
  }

  if (error) {
    return <Error message="Fragmanlar yüklenirken bir hata oluştu." />;
  }

  if (!data?.results || data.results.length === 0) {
    return <NoTrailer />;
  }

  const trailers = data.results.filter(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );

  if (trailers.length === 0) {
    return <NoTrailer />;
  }

  return (
    <div className="my-10">
      <h2 className="text-xl font-semibold my-5 md:text-lg">Fragmanlar</h2>
      <Splide options={{ pagination: false }} aria-label="Film Fragmanları">
        {trailers.slice(0, 5).map((video: Video) => (
          <SplideSlide key={video.id}>
            <div className="w-full h-[30vh] md:h-[50vh]">
              <ReactPlayer
                controls
                width="100%"
                height="100%"
                url={`https://www.youtube.com/watch?v=${video.key}`}
                light={true}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default VideoList;
