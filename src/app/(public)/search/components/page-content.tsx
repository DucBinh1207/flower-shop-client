"use client";

import { ProductCard } from "@/components/product-card";
import { useProductStore } from "src/store/productStore";

export default function PageContent() {
  const { products, productImage } = useProductStore();

  return (
    <div className="px-4 py-8 md:px-6 md:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div>
            <div className="rounded-lg bg-white p-4">
              <p className="mb-3 text-gray-600">Ảnh tìm kiếm :</p>

              <img
                src={productImage}
                alt="Preview"
                className="w-full rounded object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Hiển thị {products.length} sản phẩm
              </p>
            </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
