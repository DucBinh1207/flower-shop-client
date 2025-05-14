"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useWishlistStore } from "src/store/wishlistStore";
import { useCartStore } from "src/store/cartStore";
import Link from "next/link";

export default function PageContent() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  const handleAddToCart = (productId: string) => {
    const product = items.find((item) => item.id === productId);
    if (product) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      toast({
        title: "Đã thêm vào giỏ hàng",
        description: `${product.name} đã được thêm vào giỏ hàng.`,
      });
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    const product = items.find((item) => item.id === productId);
    removeItem(productId);
    if (product) {
      toast({
        title: "Đã xóa khỏi yêu thích",
        description: `${product.name} đã được xóa khỏi danh sách yêu thích.`,
      });
    }
  };

  const handleClearWishlist = () => {
    clearWishlist();
    setIsConfirmingClear(false);
    toast({
      title: "Đã xóa danh sách",
      description: "Tất cả sản phẩm đã được xóa khỏi danh sách yêu thích.",
    });
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Danh sách yêu thích
            </h1>
            {items.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setIsConfirmingClear(true)}
                  className="text-sm font-medium text-gray-600 hover:text-red-600"
                >
                  Xóa tất cả
                </button>
                {isConfirmingClear && (
                  <div className="absolute right-0 z-10 mt-2 w-64 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
                    <p className="px-4 py-2 text-sm text-gray-700">
                      Bạn có chắc muốn xóa tất cả?
                    </p>
                    <div className="flex justify-end border-t border-gray-100 px-4 py-2">
                      <button
                        onClick={() => setIsConfirmingClear(false)}
                        className="mr-2 rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Hủy
                      </button>
                      <button
                        onClick={handleClearWishlist}
                        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                      >
                        Xóa tất cả
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
              <div className="mb-4 text-gray-400">
                <i className="bx bx-heart text-6xl"></i>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Danh sách yêu thích trống
              </h3>
              <p className="mb-4 text-gray-500">
                Bạn chưa thêm sản phẩm nào vào danh sách yêu thích.
              </p>
              <Link
                href="/products"
                className="inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
              >
                Khám phá sản phẩm
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-lg bg-white shadow-sm"
                >
                  <div className="relative">
                    <Link href={`/products/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </Link>
                    <button
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-red-500 shadow-md hover:bg-gray-100 hover:text-red-600"
                      title="Xóa khỏi yêu thích"
                    >
                      <i className="bx bx-x text-xl"></i>
                    </button>
                    {product.discount && (
                      <div className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="mb-1 text-lg font-semibold text-gray-800 transition-colors hover:text-primary">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mb-2 flex items-center">
                      <div className="mr-1 flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`bx ${i < Math.round(product.rating) ? "bxs-star" : "bx-star"} text-sm`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        ({product.reviewCount} đánh giá)
                      </span>
                    </div>
                    <div className="mb-3 flex items-center">
                      <span className="text-lg font-bold text-gray-800">
                        {product.price.toLocaleString()}₫
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()}₫
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddToCart(product.id)}
                      className="flex w-full items-center justify-center rounded bg-primary py-2 text-white transition-colors hover:bg-primary-dark"
                    >
                      <i className="bx bx-cart-add mr-1"></i> Thêm vào giỏ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
