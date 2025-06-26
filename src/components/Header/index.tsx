import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { IoBookmarks } from "react-icons/io5";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import SearchBar from "../SearchBar";
import MobileSearch from "../MobileSearch";
import { useGetWatchListQuery } from "../../redux/api";

const Header: React.FC = () => {
  const { data, isLoading } = useGetWatchListQuery();
  const count = data?.results.length || 0;

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const [showSearch, setShowSearch] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll.current && currentScroll > 80) {
        setShowSearch(false);
      } else {
        setShowSearch(true);
      }
      lastScroll.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header className="sticky top-0 z-50 bg-transparent backdrop-blur-md px-4 py-1 flex items-center justify-between mb-10">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <img src="/logo.png" alt="logo" className="max-w-[100px]" />
      </Link>

      {/* Masaüstü arama çubuğu */}
      <div
        className={`flex-1 mx-6 transition-all duration-300 ease-in-out ${
          showSearch ? "opacity-100 h-auto" : "opacity-0 h-0 pointer-events-none"
        } hidden md:block`}
      >
        <SearchBar onSearch={handleSearch} placeholder="Film ara..." initialValue={query} />
      </div>

      {/* Sağdaki butonlar */}
      <div className="flex items-center gap-4">
        {/* İzleme Listesi */}
        <Link
          to="/watch-list"
          className="flex items-center gap-2 relative text-white hover:text-gray-300 transition"
        >
          <div className="relative">
            <IoBookmarks className="text-2xl" />
            {!isLoading && count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs font-semibold">
                {count}
              </span>
            )}
          </div>
          <span className="hidden sm:inline">İzleme Listesi</span>
        </Link>

        {/* Mobil arama ikonu */}
        <div className="md:hidden">
          <MobileSearch />
        </div>
      </div>
    </header>
  );
};

export default Header;

