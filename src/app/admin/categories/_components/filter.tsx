import useDebounceCallback from "@/hooks/use-debounce-callback";
import { Category } from "@/types/index";
import React, { useState } from "react";

interface FilterSearchProps {
  SearchCategory: string;
  handleSearchChange: (value: string) => void;
}

export default function FilterSearch({
  SearchCategory,
  handleSearchChange,
}: FilterSearchProps) {
  const [state, setState] = useState(SearchCategory);

  const [handleDebounceSearch] = useDebounceCallback(
    () => handleSearchChange(state),
    300,
  );

  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Tìm kiếm danh mục..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            value={state}
            onChange={(e) => {
              handleDebounceSearch();
              setState(e.target.value);
            }}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
            <i className="bx bx-search text-xl"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
