import * as React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message = "Bir hata oluştu." }) => {
  return (
    <div className="bg-black text-yellow-400 rounded-xl p-8 shadow-lg max-w-md mx-auto mt-24 border border-yellow-600">
      <div className="flex flex-col items-center space-y-6">
        <FaExclamationTriangle className="text-5xl text-yellow-500 animate-ping" />
        <h2 className="text-2xl font-bold text-center tracking-wider uppercase">
          YÜKLEME HATASI
        </h2>
        <p className="text-md text-center font-semibold text-yellow-300">
          {message}
        </p>
        <p className="text-sm text-center text-yellow-500 font-light animate-bounce">
          Film burada kesildi. Yeniden başlatmayı deneyebilirsin.
        </p>
        <p className="text-xs text-yellow-600 italic text-center animate-pulse">
          Perde kapandı. Yeni sahne yakında başlıyor.
        </p>
      </div>
    </div>
  );
};

export default Error;
