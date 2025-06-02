import React from "react";
import { PageLoading } from "@/components/page-loading";
import PaginationList from "@/components/ui/pagination-list";
import { CategoryCard } from "@/components/category-card";
import { Category } from "@/types/index";
import { StateCategoryQuery } from "../_hooks/use-categories";

type CategoryListProps = {
  totalPages: number;
  currentPage: number;
  categories: Category[];
  isLoading: boolean;
  setState: (partialState: Partial<StateCategoryQuery>) => void;
};

export default function CategoryList({
  categories,
  isLoading,
  totalPages,
  currentPage,
  setState,
}: CategoryListProps) {
  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {categories.map((category) => (
          <>
            <CategoryCard
              key={category.id}
              category={category}
            />
          </>
        ))}
      </div>
      <div className="mt-[50px] flex justify-center">
        <PaginationList
          totalPage={totalPages}
          currentPage={currentPage}
          onChangePage={(page) =>
            setState({
              page,
            })
          }
        />
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="rounded-lg bg-white py-12 text-center shadow-sm">
          <i className="bx bx-package mb-4 text-5xl text-gray-300"></i>
          <h3 className="mb-2 text-xl font-medium">
            Không tìm thấy sản phẩm nào
          </h3>
          <p className="text-gray-500">Hãy thử tìm kiếm với điều kiện khác.</p>
          <button
            onClick={() =>
              setState({
                search: "",
              })
            }
            className="mt-4 rounded-md bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </>
  );
}
