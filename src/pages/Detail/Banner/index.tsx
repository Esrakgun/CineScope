import { IMAGE_BASE_URL, FALLBACK_IMAGE } from "../../../constants";
import { MovieDetail } from "../../../types/movie";

interface Props {
  movie: MovieDetail;
}

const Banner: React.FC<Props> = ({ movie }) => {
  const poster = movie.backdrop_path
    ? IMAGE_BASE_URL + movie.backdrop_path
    : FALLBACK_IMAGE;

  // console.log("Poster path:", movie.poster_path);
  // console.log("Poster URL:", poster);

  return (
    <div className="w-full max-h-[60vh] overflow-hidden rounded relative drop-shadow-[0_0_80px_rgba(255,255,255,0.4)] mb-10">
      <img
        src={poster}
        alt={movie.title}
        className="w-full h-full object-cover object-center rounded-sm"
      />
      <div className="absolute inset-0 bg-black/20 grid place-items-center p-3">
        <h2 className="text-3xl md:text-4xl font-mono font-semibold text-center text-white">
          {movie.title}
        </h2>
      </div>
    </div>
  );
};

export default Banner;
