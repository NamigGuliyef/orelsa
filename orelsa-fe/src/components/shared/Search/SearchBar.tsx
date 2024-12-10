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

  const fetchSearchData = async (query: string) => {
    if (!query) return;
    const url = `http://localhost:9089/guest/search?name=${query}`;
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
    <div className="relative search-bar-classname-unique">
      <form
        className={cn(
          "transition-all duration-300 ease-in-out w-full sm:w-[280px] lg:w-[350px] xl:w-[400px] 2xl:w-[450px]"
        )}
      >
        <div className="relative pt-5">
          <input
            type="search"
            placeholder="Axtarış"
            className="w-full focus-visible:outline-none outline-none h-full p-4 rounded-full border border-gray-300 transition-all duration-200 ease-in-out"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />
        </div>
        {searchQuery && (
          <div className="absolute top-18 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg p-2 z-50 w-full max-w-[400px]">
            {searchResults.length > 0
              ? searchResults.map((result) => (
                  <Link
                    href={`/products/${result._id}`}
                    key={result._id}
                    className="block p-2 hover:bg-[#FCF8F3] rounded transition duration-200 "
                    onClick={() => {
                      setSearchQuery("");
                    }}
                  >
                    {result.name}
                  </Link>
                ))
              : searchQuery && (
                  <div className="p-2 text-gray-500">No results found</div>
                )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
