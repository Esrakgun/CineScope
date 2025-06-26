import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchResults from "../SearchResults";
import SearchBar from "../SearchBar";
import { useWindowWidth } from "../../hooks/useWindowWidth";
// yukarıdaki hook’u ekle

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  const width = useWindowWidth();

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
  };

  // 768px’den büyükse input gösterme (desktop), küçükse göster (mobile)
  const showInput = width < 768;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {showInput && <SearchBar onSearch={handleSearch} initialValue={query} />}
      {query && <SearchResults />}
    </div>
  );
};

export default SearchPage;
