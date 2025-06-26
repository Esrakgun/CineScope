import * as React from "react";
import { FaExclamationCircle, FaFilm } from "react-icons/fa";

interface ErrorProps {
  message?: string;
}

const HomeError: React.FC<ErrorProps> = ({ message = "Bir hata oluştu." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-yellow-400 p-6">
      <FaExclamationCircle className="text-7xl text-yellow-500 animate-pulse mb-6" />
      <h1 className="text-3xl font-bold uppercase mb-4 tracking-widest text-center">
        Sayfa Yüklenemedi
      </h1>
      <p className="text-lg italic mb-6 text-center max-w-md">{message}</p>
      <FaFilm className="text-6xl animate-bounce" />
      <p className="text-sm italic mt-6 text-yellow-300 text-center max-w-xs">
        Lütfen sayfayı yenileyin veya sonra tekrar deneyin.
      </p>
    </div>
  );
};

export default HomeError;
