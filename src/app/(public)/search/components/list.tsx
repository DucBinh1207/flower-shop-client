import React from "react";
import { ProductCard } from "@/components/product-card";
import { PageLoading } from "@/components/page-loading";
import PaginationList from "@/components/ui/pagination-list";

import { Product } from "@/types/index";
import { StateProductQuery } from "../_hooks/use-products";

type ProductsGridProps = {
  totalPages: number;
  currentPage: number;
  products: Product[];
  isLoading: boolean;
  setState: (partialState: Partial<StateProductQuery>) => void;
};

export default function ProductsGrid({
  products,
  isLoading,
  totalPages,
  currentPage,
  setState,
}: ProductsGridProps) {
  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <>
            <ProductCard
              key={product.id}
              product={product}
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
      {products.length === 0 && (
        <div className="rounded-lg bg-white py-12 text-center shadow-sm">
          <i className="bx bx-package mb-4 text-5xl text-gray-300"></i>
          <h3 className="mb-2 text-xl font-medium">
            Không tìm thấy sản phẩm nào
          </h3>
          <p className="text-gray-500">Hãy thử tìm kiếm với điều kiện khác.</p>
          <button
            onClick={() =>
              setState({
                supplierId: "",
                categoryId: "",
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
