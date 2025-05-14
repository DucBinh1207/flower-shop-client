"use client";

import { PageLoading } from "@/components/page-loading";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/index";

interface RelatedProductsProps {
  relatedProducts: Product[];
  isLoading: boolean;
}

export default function RelatedProducts({
  relatedProducts,
  isLoading,
}: RelatedProductsProps) {
  if (isLoading) {
    return <PageLoading></PageLoading>;
  }

  if (!isLoading && !relatedProducts) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Sản phẩm liên quan
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {relatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
