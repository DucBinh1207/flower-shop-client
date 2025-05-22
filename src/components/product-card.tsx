"use client";

import Link from "next/link";
import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "src/store/cartStore";

import type { Product } from "../types";
import { useWishlistStore } from "src/store/wishlistStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { addItem: addItemToWishList } = useWishlistStore();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    toast({
      title: "Thêm vào giỏ hàng thành công",
      description: `Đã thêm ${product.name} vào giỏ hàng của bạn.`,
    });
  };

  const handleAddToWishList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItemToWishList(product);

    toast({
      title: "Thêm vào danh sách yêu thích",
      description: `Đã thêm ${product.name} vào danh sách yêu thích của bạn.`,
    });
  };

  return (
    <div
      className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <Link href={`/products/${product.slug}`}>
          <div className="h-48 overflow-hidden md:h-56">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Tags */}
        <div className="absolute left-2 top-2">
          {product.discount && (
            <span className="rounded-full bg-primary px-2 py-1 text-xs text-white">
              -{product.discount}%
            </span>
          )}
          {product.isNew && !product.discount && (
            <span className="rounded-full bg-green-500 px-2 py-1 text-xs text-white">
              Mới
            </span>
          )}
          {product.isBestSeller && !product.discount && !product.isNew && (
            <span className="rounded-full bg-accent px-2 py-1 text-xs text-white">
              Bán chạy
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div
          className={`absolute bottom-0 left-0 right-0 translate-y-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white transition-transform duration-300`}
        >
          <div className="flex justify-center space-x-3">
            <Link
              href={`/products/${product.slug}`}
              className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm hover:bg-white/40"
              title="Xem nhanh"
            >
              <i className="bx bx-show text-lg" />
            </Link>
            <button
              className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm hover:bg-white/40"
              title="Thêm vào giỏ hàng"
              onClick={handleAddToCart}
            >
              <i className="bx bx-cart-add text-lg" />
            </button>
            <button
              className="rounded-full bg-white/20 p-1.5 backdrop-blur-sm hover:bg-white/40"
              title="Thêm vào yêu thích"
              onClick={handleAddToWishList}
            >
              <i className="bx bx-heart text-lg" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Rating */}
        <div className="mb-1 flex items-center text-sm text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`bx ${i < Math.floor(product.rating) ? "bxs-star" : i < product.rating ? "bxs-star-half" : "bx-star"}`}
            />
          ))}
          <span className="ml-1 text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Product Name */}
        <h3 className="font-medium text-gray-800 transition-colors duration-300 hover:text-primary">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Package info */}
        <p className="my-1 text-sm text-gray-500">{product.packageSize}</p>

        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg font-semibold text-primary">
              {product.price.toLocaleString()}₫
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString()}₫
              </span>
            )}
          </div>
          <button
            className="rounded-full bg-primary p-1.5 text-white hover:bg-primary-dark md:hidden"
            onClick={handleAddToCart}
          >
            <i className="bx bx-cart-add text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}
