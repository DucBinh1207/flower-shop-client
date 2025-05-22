"use client";

import { getCommentsByProductId } from "@/constants/comments";
import ProductGallery from "./gallery";
import ProductSummary from "./summary";
import ProductTabs from "./tab";
import RelatedProducts from "./related";
import Link from "next/link";
import { Product, ProductDetail } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product-api";

interface ProductDetailViewProps {
  product: ProductDetail;
}

export default function PageContent({ product }: ProductDetailViewProps) {
  const { data: { data = [] } = {}, isLoading: isLoadingRelated } = useQuery({
    queryKey: ["relate product"],
    queryFn: () =>
      getProducts({
        categoryId: product.categoryId.id,
        limit: 4,
      }),
    enabled: !!product,
  });

  const comments = getCommentsByProductId(product.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link
          href="/"
          className="text-gray-500 hover:text-primary"
        >
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/products?categoryId=${product.categoryId.id}`}
          className="text-gray-500 hover:text-primary"
        >
          {product.categoryId.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <ProductGallery product={product} />
        <ProductSummary product={product} />
      </div>

      <ProductTabs
        product={product}
        comments={comments}
      />

      <RelatedProducts
        isLoading={isLoadingRelated}
        relatedProducts={data}
      />
    </div>
  );
}
