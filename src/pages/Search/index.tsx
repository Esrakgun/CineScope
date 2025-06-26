import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchResults from "../../components/SearchResults";
import SearchBar from "../../components/SearchBar";

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query") || "";

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
  };

  return (
    <div className="min-h-screen text-white p-4">
      <SearchBar
        onSearch={handleSearch}
        initialValue={query}
        designs="block md:hidden mb-10" 
      />

      {query && <SearchResults />}
    </div>
  );
};

export default SearchPage;
