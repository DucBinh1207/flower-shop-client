"use client";

import Header from "./header";
import SearchBar from "./searchbar";
import CategoryList from "./list";
import { useCategoryFiltering } from "../_hooks/use-categories";

export default function PageContent() {
  const { data, state, isLoading, totalPages, setState } =
    useCategoryFiltering();

  return (
    <div className="px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Header />

        <SearchBar
          searchQuery={state.search}
          handleSearchChange={(search) =>
            setState({
              search,
            })
          }
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Products container */}
          <div className="lg:col-span-4">
            {/* Sort bar */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Hiển thị {data.length} danh mục
              </p>
            </div>

            {/* Products grid */}
            <CategoryList
              categories={data}
              isLoading={isLoading}
              totalPages={totalPages}
              currentPage={state.page}
              setState={setState}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
