"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "src/store/cartStore";
import { useRouter } from "next/navigation";
import { ProductDetail } from "@/types/index";

interface ProductSummaryProps {
  product: ProductDetail;
}

export default function ProductSummary({ product }: ProductSummaryProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });

    toast({
      title: "Thêm vào giỏ hàng thành công",
      description: `Đã thêm ${quantity} ${product.name} vào giỏ hàng của bạn.`,
    });
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });

    router.push("/cart");
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-gray-800 md:text-3xl">
        {product.name}
      </h1>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline">
          <span className="text-2xl font-semibold text-primary">
            {product.price.toLocaleString()}₫
          </span>
          {product.originalPrice && (
            <span className="ml-2 text-lg text-gray-400 line-through">
              {product.originalPrice.toLocaleString()}₫
            </span>
          )}
          {product.discount && (
            <span className="ml-2 rounded-full bg-primary px-2 py-1 text-sm text-white">
              -{product.discount}%
            </span>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 py-4">
        <p className="mb-4 text-gray-700">{product.shortDescription}</p>

        <div className="mb-4">
          <span className="font-medium text-gray-700">Kích thước:</span>
          <span className="ml-2 text-gray-600">{product.packageSize}</span>
        </div>

        <div className="mb-4">
          <span className="font-medium text-gray-700">Số lượng hạt:</span>
          <span className="ml-2 text-gray-600">{product.seedCount} hạt</span>
        </div>

        <div className="mb-4">
          <span className="font-medium text-gray-700">Tình trạng:</span>
          <span
            className={`ml-2 ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}
          >
            {product.stock > 0 ? `Còn hàng (${product.stock})` : "Hết hàng"}
          </span>
        </div>

        {/* Quantity selector */}
        <div className="mb-6">
          <label className="mb-2 block font-medium text-gray-700">
            Số lượng:
          </label>
          <div className="flex items-center">
            <button
              className="rounded-l-md border border-gray-300 p-2"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={product.stock <= 0}
            >
              <i className="bx bx-minus"></i>
            </button>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.min(
                    product.stock,
                    Math.max(1, parseInt(e.target.value) || 1),
                  ),
                )
              }
              className="w-16 border-y border-gray-300 p-2 text-center focus:outline-none"
              disabled={product.stock <= 0}
            />
            <button
              className="rounded-r-md border border-gray-300 p-2"
              onClick={() =>
                setQuantity((prev) => Math.min(product.stock, prev + 1))
              }
              disabled={product.stock <= 0}
            >
              <i className="bx bx-plus"></i>
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            onClick={handleAddToCart}
            className="btn-primary flex-1"
            disabled={product.stock <= 0}
          >
            <i className="bx bx-cart-add mr-2"></i>
            Thêm vào giỏ hàng
          </Button>
          <Button
            onClick={handleBuyNow}
            className="btn-secondary flex-1"
            disabled={product.stock <= 0}
          >
            Mua ngay
          </Button>
        </div>
      </div>

      {/* Share buttons */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <i className="bx bx-share-alt mr-2 text-gray-500"></i>
          <span className="text-sm text-gray-500">Chia sẻ:</span>
          <a
            href="#"
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            <i className="bx bxl-facebook-circle text-xl"></i>
          </a>
          <a
            href="#"
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <i className="bx bxl-pinterest text-xl"></i>
          </a>
          <a
            href="#"
            className="ml-2 text-blue-400 hover:text-blue-600"
          >
            <i className="bx bxl-twitter text-xl"></i>
          </a>
        </div>
        <button className="flex items-center text-gray-500 hover:text-red-500">
          <i className="bx bx-heart mr-1"></i>
          <span className="text-sm">Yêu thích</span>
        </button>
      </div>
    </div>
  );
}
