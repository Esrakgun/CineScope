import * as React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../SearchBar";

const DesktopSearch: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    const encoded = encodeURIComponent(trimmed);

    if (location.pathname === "/search") {
      navigate(`/search?query=${encoded}`, { replace: true });
    } else {
      navigate(`/search?query=${encoded}`);
    }
  };

  return (
    <SearchBar onSearch={handleSearch} initialValue={query} />
  );
};

export default React.memo(DesktopSearch);
