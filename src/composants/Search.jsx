"use client";

import { useEffect, useState } from "react";

export function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onSearch(query);
  }, [query]);

  return (
    <form className="flex w-[70%]  max-[816px]:w-full">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          borderLeft: "1px solid gray",
          borderTop: " 1px solid gray",
          borderBottom: "1px solid gray",
          borderBottomLeftRadius: " 50px",
          borderTopLeftRadius: "50px",
        }}
        className="w-full h-[50px] outline-0 px-[20px] "
        type="search"
        placeholder="Rechercher un produit ..........."
      />

      <span
        className="flex items-center px-[10px]"
        style={{
          borderRight: "1px solid gray",
          borderTop: "1px solid gray",
          borderBottom: "1px solid gray",
          borderTopRightRadius: "50px",
          borderBottomRightRadius: "50px",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </span>
    </form>
  );
}
