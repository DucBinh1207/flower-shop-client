"use client";

import { useProductFiltering } from "../_hooks/use-products";
import Header from "./header";
import SearchBar from "./searchbar";
import ProductsGrid from "./list";
import ProductSidebar from "./sidebar";

export default function PageContent() {
  const { data, state, isLoading, totalPages, setState } =
    useProductFiltering();

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
          {/* Sidebar with filters */}
          <ProductSidebar
            state={state}
            setState={setState}
          />

          {/* Products container */}
          <div className="lg:col-span-3">
            {/* Sort bar */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Hiển thị {data.length} sản phẩm
              </p>

              <div className="flex items-center">
                <label
                  htmlFor="sort"
                  className="mr-2 text-sm text-gray-600"
                >
                  Sắp xếp theo:
                </label>
                <select
                  id="sort"
                  className="rounded border border-gray-200 bg-white px-4 py-2 pr-8 text-gray-700 focus:border-primary focus:outline-none focus:ring-primary"
                  value={state.sort}
                  onChange={(e) =>
                    setState({
                      sort: e.target.value,
                    })
                  }
                >
                  <option value="popularity">Nổi bật</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="rating">Đánh giá cao nhất</option>
                </select>
              </div>
            </div>

            {/* Mobile filters (only visible on small screens) */}
            {/* <MobileFilters
              categories={categories}
              activeCategoryId={activeCategoryId}
              activeFilter={activeFilter}
              handleCategoryChange={handleCategoryChange}
              handleFilterChange={handleFilterChange}
            /> */}

            {/* Products grid */}
            <ProductsGrid
              products={data}
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
