import useDebounceCallback from "@/hooks/use-debounce-callback";
import React, { useState } from "react";

type SearchBarProps = {
  searchQuery: string;
  handleSearchChange: (value: string) => void;
};

export default function SearchBar({
  searchQuery,
  handleSearchChange,
}: SearchBarProps) {
  const [state, setState] = useState(searchQuery);

  const [handleDebounceSearch] = useDebounceCallback(
    () => handleSearchChange(state),
    300,
  );

  return (
    <div className="mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full rounded-lg border border-gray-200 p-3 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
          value={state}
          onChange={(e) => {
            handleDebounceSearch();
            setState(e.target.value);
          }}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <i className="bx bx-search text-gray-400"></i>
        </div>
      </div>
    </div>
  );
}
