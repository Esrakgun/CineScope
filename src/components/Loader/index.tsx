import * as React from 'react';
import { FaSpinner, FaFilm } from 'react-icons/fa';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-yellow-400 px-4">
      <FaSpinner className="text-6xl animate-spin mb-6" aria-hidden="true" />
      <FaFilm className="text-5xl mb-4" aria-hidden="true" />
      <p
        className="text-xl font-semibold tracking-wide uppercase animate-pulse text-center"
        role="status"
        aria-live="polite"
      >
        Yükleniyor...
      </p>
    </div>
  );
};

export default Loader;
