import * as React from "react";
import { useCallback } from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import type { Cast } from "../../../types/movie"; 
import Error from "../../../components/Error";
import { IMAGE_BASE_URL } from "../../../constants";  

interface ActorListProps {
  cast: Cast[];
}

const ActorList: React.FC<ActorListProps> = ({ cast }) => {
  // Hook’lar burada, koşul ve return’lerden önce
  const textFormat = useCallback((name: string) => {
    return name.length > 15 ? name.slice(0, 15) + "..." : name;
  }, []);

  const getProfileUrl = useCallback((actor: Cast) => {
    if (actor.profile_path) return IMAGE_BASE_URL + actor.profile_path;
    if (actor.gender === 1) return "/woman.png";
    if (actor.gender === 2) return "/man.png";
    return "/no.png";
  }, []);

  // Koşullar burada
  if (!cast) return <Error message ="Oyuncu bilgisi bulunamadı." />;
  if (cast.length === 0) return <p>Oyuncu bilgisi yok.</p>;

  // Render
  return (
    <Splide
      options={{
        autoWidth: true,
        gap: "30px",
        type: "loop",
        drag: "free",
        focus: "center",
        pagination: false,
        perPage: 5,
        autoScroll: {
          speed: 0.5,
        },
      }}
      extensions={{ AutoScroll }}
    >
      {cast.map((actor) => (
        <SplideSlide key={actor.id}>
          <div className="w-[160px] h-full flex flex-col gap-1">
            <img
              className="h-full object-cover rounded"
              src={getProfileUrl(actor)}
              alt={actor.name}
            />
            <h2 className="font-semibold text-center mt-2">
              {textFormat(actor.name)}
            </h2>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default React.memo(ActorList);
