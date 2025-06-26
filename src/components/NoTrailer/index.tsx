import * as React from "react";
import { FaFilm } from "react-icons/fa";

const NoTrailer: React.FC = () => {
  return (
    <div className="my-10 flex flex-col items-center justify-center text-red-500">
      <FaFilm className="text-6xl mb-4 animate-pulse text-red-600 drop-shadow-[0_0_8px_rgba(255,0,0,1)]" />
      <p className="text-xl font-semibold italic text-center text-red-500 drop-shadow-lg animate-pulse">
         Üzgünüz,Bu film için fragman bulunamadı🎬
      </p>
    </div>
  );
};

export default NoTrailer;
