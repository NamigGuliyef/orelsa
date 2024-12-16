"use client";

import { IProductById } from "@/interface/ui";
import { cn } from "@nextui-org/theme";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProductById[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const fetchSearchData = async (query: string) => {
    if (!query) return;
    const url = `https://orelsa.vercel.app/guest/search?name=${query}`;
    try {
      const { data } = await axios.get(url);
      setSearchResults(data);
    } catch (err) {
      console.error("Error is :", err);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const debounceFetch = setTimeout(() => {
        fetchSearchData(searchQuery);
      }, 300);

      return () => clearTimeout(debounceFetch);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="relative">
      {/* Lupa düyməsi */}
      {!isSearchVisible && (
        <button
          className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 text-white"
          onClick={() => setIsSearchVisible(true)}
        >
          <CiSearch size={18} />
        </button>
      )}

      {/* Axtarış Input */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out transform origin-top w-full sm:w-[240px] lg:w-[300px] xl:w-[350px] 2xl:w-[380px]", // Animasiya üçün transform əlavə edildi
          isSearchVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        )}
      >
        {isSearchVisible && (
          <form>
            <div className="relative pt-3">
              <input
                type="search"
                placeholder="Axtarış"
                className="w-full focus-visible:outline-none outline-none h-[40px] p-2 rounded-lg border border-gray-300 transition-all duration-200 ease-in-out"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
              />
              {/* Inputu bağlamaq üçün düymə */}
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                onClick={() => {
                  setIsSearchVisible(false);
                  setSearchQuery("");
                }}
              >
                ✖
              </button>
            </div>

            {searchQuery && (
              <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg p-1 z-50 w-full max-w-[350px]">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Link
                      href={`/products/${result._id}`}
                      key={result._id}
                      className="flex items-center gap-2 block p-1 hover:bg-[#FCF8F3] rounded transition duration-200"
                      onClick={() => {
                        setSearchQuery("");
                        setIsSearchVisible(false);
                      }}
                    >
                      {result.photos && result.photos[0] && (
                        <img
                          src={result.photos[0]}
                          alt={result.name}
                          className="w-8 h-8 rounded object-cover"
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{result.name}</span>
                        <span className="text-xs text-gray-500">{result.price} AZN</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-1 text-gray-500 text-sm">Məhsul tapılmadı ❌</div>
                )}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
