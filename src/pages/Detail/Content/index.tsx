import * as React from "react";
import millify from "millify";
import { ContentMovie } from "../../../types/movie";
import List from "../List";

interface ContentProps {
  movie: ContentMovie;
}

const Content: React.FC<ContentProps> = ({ movie }) => {
  return (
    <div className="my-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 text-neutral-100">
      {/* Sol taraf: Kategoriler, Diller, Şirketler, Ülkeler */}
      <div>
        <List title="Kategoriler" arr={movie.genres} />
        <List title="Diller" arr={movie.spoken_languages} />
        <List title="Yapımcı Şirketler" arr={movie.production_companies} />
        <List title="Yapımcı Ülkeler" arr={movie.production_countries} />
      </div>

      {/* Sağ taraf: Özet ve finansal detaylar */}
      <div className="flex flex-col gap-4">
        <p>{movie.overview ? movie.overview : "Özet bulunamadı."}</p>

        <p>
          <span className="font-semibold text-yellow-400">Bütçe: </span>
          <span className="text-red-500 font-semibold">
            {movie.budget === 0 ? "Bilinmiyor" : `$${millify(movie.budget)}`}
          </span>
        </p>

        <p>
          <span className="font-semibold text-yellow-400">Hasılat: </span>
          <span className="text-red-500 font-semibold">
            {movie.revenue === 0 ? "Bilinmiyor" : `$${millify(movie.revenue)}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Content;
