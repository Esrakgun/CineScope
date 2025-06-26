// 🎬 Ana film tipi: Listeleme (Home, GenreList vs.)
interface Movie {
  id: number;
  title?: string;
  original_title?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

// 🎬 Listeleme sonuçları (RTK Query'den dönen veri)
interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// 📂 Türler
interface Genre {
  id: number;
  name: string;
}

interface GenreResponse {
  genres: Genre[];
}

// 📽️ Video detayları (YouTube linkleri için)
interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

// 👤 Oyuncu bilgisi
interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  gender?: number;  // Opsiyonel olarak ekledim
}

// 🧠 Detay sayfasında ihtiyacın olan tüm alanlar
interface MovieDetail {
  id: number;
  title: string;
  original_title?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview: string;
  release_date: string;
  vote_average: number;

  // 📽️ Video listesi
  videos: {
    results: Video[];
  };

  // 👥 Oyuncular
  credits: {
    cast: Cast[];
  };

  // ✅ Ekstra bilgiler (Content.tsx için)
  genres: Genre[];
  spoken_languages: {
    iso_639_1?: string;
    name: string;
  }[];
  production_companies: {
    id?: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1?: string;
    name: string;
  }[];

  budget: number;
  revenue: number;

  // 💬 Yeni eklendi: yorumlar (opsiyonel)
  comments?: Comment[];
}

// 🎞️ Content bileşeninde kullanacağın tip (MovieDetail'den subset)
interface ContentMovie {
  poster_path: string | null;
  title: string;
  genres: {
    id: number;
    name: string;
  }[];
  spoken_languages: {
    iso_639_1?: string;
    name: string;
  }[];
  production_companies: {
    id?: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1?: string;
    name: string;
  }[];
  overview: string;
  budget: number;
  revenue: number;
}

// 📝 Yorum tipi (örnek, yorum yapısı gereksinimine göre düzenlenebilir)
interface Comment {
  id: number;
  user: string;
  text: string;
  date: string;
}

// 🔄 Tüm tipleri export et
export type {
  Movie,
  MovieResponse,
  Genre,
  GenreResponse,
  Video,
  Cast,
  MovieDetail,
  ContentMovie,
  Comment,
};
