import { useState } from "react";
import searchIcon from "../assets/icons/search.png";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-5 py-3 shadow-sm">
        <span>
          <img
            src={searchIcon}
            alt="search"
            className="w-4 h-4 md:w-6 md:h-6"
          />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari barang keperluan kamu..."
          className="w-full outline-none text-gray-700 text-sm md:text-base"
        />
      </div>
    </form>
  );
}

export default Search;
