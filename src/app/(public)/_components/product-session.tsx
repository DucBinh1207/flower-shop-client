import { getProducts } from "@/api/product-api";
import { PageLoading } from "@/components/page-loading";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function ProductSession() {
  const [activeTab, setActiveTab] = useState<"all" | "new" | "bestseller">(
    "all",
  );
  const displayProducts: Product[] = [];

  const { data: { data = [] } = {}, isLoading } = useQuery({
    queryKey: ["products", activeTab],
    queryFn: () =>
      getProducts({
        limit: 8,
        ...(activeTab === "new" && {
          isNew: true,
        }),
        ...(activeTab === "bestseller" && {
          isBestSeller: true,
        }),
      }),
  });

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
        <h2 className="mb-3 font-montserrat text-2xl font-bold text-gray-800 sm:mb-0">
          Sản phẩm nổi bật
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            className={`rounded-full px-3 py-1 text-sm ${
              activeTab === "all"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("all")}
          >
            Tất cả
          </button>
          <button
            className={`rounded-full px-3 py-1 text-sm ${
              activeTab === "new"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("new")}
          >
            Mới nhất
          </button>
          <button
            className={`rounded-full px-3 py-1 text-sm ${
              activeTab === "bestseller"
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("bestseller")}
          >
            Bán chạy
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-10">
          <PageLoading />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          href="/products"
          className="btn-secondary"
        >
          <span>Xem thêm sản phẩm</span>
          <i className="bx bx-chevron-down ml-2" />
        </Link>
      </div>
    </section>
  );
}
