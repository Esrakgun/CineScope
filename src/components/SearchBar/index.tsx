import * as React from "react";
import { useState, useCallback, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;  
  designs?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Bir şeyler yaz...",
  initialValue = "",
   designs = "" 
}) => {
  const [query, setQuery] = useState(initialValue);

  // Eğer dışarıdan gelen initialValue değişirse input güncellenir
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // useCallback ile fonksiyon referansını sabitliyoruz
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch(query.trim());
    },
    [onSearch, query]
  );

  return (
    <form
      onSubmit={handleSubmit}
    className={`flex items-center w-full max-w-md mx-auto px-4 ${designs}`}
      role="search"
      aria-label="Film arama formu"
    >
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-l-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Film arama kutusu"
        autoComplete="off"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition"
        aria-label="Ara butonu"
      >
        Ara
      </button>
    </form>
  );
};

export default React.memo(SearchBar);
