import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import { searchProductsByName } from "@/constants/products";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import useDebounceCallback from "@/hooks/use-debounce-callback";
import { useProductBySearch } from "src/app/(public)/products/_hooks/use-products-by-search";
import ImageSearchButton from "./image-search-button";

interface SearchBarProps {
  isMobile?: boolean;
}

export function SearchBar({ isMobile = false }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data, state, setState } = useProductBySearch();

  const [searchData, setSearchData] = useState(state.search);

  const [handleDebounceSearch] = useDebounceCallback(() => {
    if ( searchData.length > 1) setState({ search: searchData });
  }, 300);

  useOnClickOutside(searchRef, () => {
    setShowResults(false);
    setIsSearchFocused(false);
  });

  // Popular search term suggestions
  const popularSearchTerms = [
    "Hoa hồng",
    "Hoa sen",
    "Hoa hướng dương",
    "Hoa cúc",
    "Hoa lan",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
      setIsSearchFocused(false);
    }
  };

  const handleSearchByImage = () => {
    router.push("/search?mode=image");
  };

  const handleQuickSearch = (term: string) => {
    setQuery(term);
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setShowResults(false);
    setIsSearchFocused(false);
  };

  // Handle keyboard shortcut (ctrl+k or cmd+k) to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <div
      className={`relative w-full ${isSearchFocused ? "z-20" : ""}`}
      ref={searchRef}
    >
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col ${isMobile ? "w-full" : ""}`}
      >
        <div
          className={`group relative flex-1 ${isSearchFocused ? "shadow-md ring-2 ring-primary/20" : ""}`}
        >
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-hover:text-gray-500">
            <i className="bx bx-search text-lg" />
          </div>
          <input
            type="text"
            placeholder="Tìm hạt giống, hoa, cây cảnh... (Ctrl+K)"
            className={`w-full rounded-full border py-2.5 pl-10 pr-[4.5rem] ${isSearchFocused ? "border-primary" : "border-gray-200"} bg-gray-50/60 transition-all placeholder:text-gray-400 focus:border-primary focus:bg-white focus:outline-none`}
            value={searchData}
            onChange={(e) => {
              setSearchData(e.target.value);
              handleDebounceSearch();
              if (e.target.value.length > 1) {
                setShowResults(true);
              } else {
                setShowResults(false);
              }
            }}
            onFocus={() => {
              setIsSearchFocused(true);
              if (searchData.length > 1) {
                setShowResults(true);
              }
            }}
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Xóa tìm kiếm"
              >
                <i className="bx bx-x text-lg" />
              </button>
            )}
            {/* <button
              type="button"
              onClick={handleSearchByImage}
              className="rounded-full p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary"
              title="Tìm kiếm bằng hình ảnh"
              aria-label="Tìm kiếm bằng hình ảnh"
            >
              <i className="bx bx-camera text-lg" />
            </button> */}
            <ImageSearchButton/>
          </div>

          {isSearchFocused && (
            <div className="absolute bottom-1 right-3 text-xs text-gray-400">
              Ctrl+K
            </div>
          )}
        </div>

        {isMobile && (
          <button
            type="submit"
            className="mt-2 flex items-center justify-center rounded-full bg-primary px-4 py-2.5 text-white transition-colors hover:bg-primary-dark"
          >
            <i className="bx bx-search mr-2 text-lg" />
            <span>Tìm kiếm</span>
          </button>
        )}
      </form>

      {/* Search dropdown - either results or suggestions */}
      {isSearchFocused && (
        <div className="absolute left-0 right-0 z-20 mt-1 max-h-[70vh] overflow-hidden rounded-lg bg-white shadow-lg">
          {showResults && data.length > 0 ? (
            <div>
              <div className="border-b border-gray-50 px-4 py-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Kết quả tìm kiếm
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  Tìm thấy {data.length} sản phẩm
                </p>
              </div>
              <ul className="max-h-[35vh] overflow-y-auto py-1">
                {data.map((product) => (
                  <li key={product.id}>
                    <a
                      href={`/products/${product.id}`}
                      className="group flex items-center px-4 py-2.5 hover:bg-gray-50/80"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(`/products/${product.id}`);
                        setShowResults(false);
                        setIsSearchFocused(false);
                        setQuery("");
                      }}
                    >
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50 transition-all group-hover:border-gray-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="line-clamp-1 text-sm font-medium text-gray-800">
                          {product.name}
                        </p>
                        <div className="mt-0.5 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-medium text-primary">
                              {product.price.toLocaleString()}₫
                            </span>
                            {product.originalPrice && (
                              <span className="text-xs text-gray-400 line-through">
                                {product.originalPrice.toLocaleString()}₫
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-xs text-yellow-400">
                            <i className="bx bxs-star" />
                            <span className="ml-1 text-gray-600">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
                <li className="border-t border-gray-50 p-2">
                  <a
                    href={`/search?q=${encodeURIComponent(searchData)}&p=1&l=9&minPrice=0&maxPrice=0`}
                    className="block rounded-md px-3 py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-gray-50/80"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/products?k=${encodeURIComponent(searchData)}&p=1&l=9&minPrice=0&maxPrice=0`);
                      setShowResults(false);
                      setIsSearchFocused(false);
                    }}
                  >
                    Xem tất cả kết quả cho "{searchData}"
                    <i className="bx bx-right-arrow-alt ml-1 inline-block" />
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <div className="border-b border-gray-50 px-4 py-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Tìm kiếm phổ biến
                </h3>
              </div>
              <ul className="space-y-1 p-2">
                {popularSearchTerms.map((term) => (
                  <li key={term}>
                    <button
                      onClick={() => handleQuickSearch(term)}
                      className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50/80"
                    >
                      <i className="bx bx-trending-up mr-2 text-gray-400" />
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-50 p-2 pt-0">
                <button
                  onClick={() => router.push("/categories")}
                  className="w-full rounded-md px-3 py-2 text-center text-sm font-medium text-primary transition-colors hover:bg-gray-50/80"
                >
                  Xem tất cả danh mục
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
