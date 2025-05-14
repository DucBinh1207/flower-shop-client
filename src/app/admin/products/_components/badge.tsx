import { Product } from "@/types/index";
import React from "react";

interface ProductStatusBadgesProps {
  product: Product;
}

export default function ProductStatusBadges({
  product,
}: ProductStatusBadgesProps) {
  return (
    <div className="flex space-x-1">
      {product.isNew && (
        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
          Mới
        </span>
      )}
      {product.isBestSeller && (
        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
          Bán chạy
        </span>
      )}
      {product.discount && (
        <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
          -{product.discount}%
        </span>
      )}
      {product.stock <= 0 && (
        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800">
          Hết hàng
        </span>
      )}
    </div>
  );
}
