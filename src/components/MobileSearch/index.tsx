
import * as React from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const MobileSearch: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/search");
  };

  return (
    <button
      aria-label="Arama sayfasına git"
      onClick={handleClick}
      className="text-xl p-2 text-white"
    >
      <IoSearch />
    </button>
  );
};

export default React.memo(MobileSearch);
