"use client";

import Link from "next/link";
import Image from "next/image";
import { CartItem, useCartStore } from "src/store/cartStore";

interface CartItemProps {
  item: CartItem;
}

export default function Item({ item }: CartItemProps) {
  const { updateItemQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4">
        <div className="col-span-6 mb-4 md:mb-0">
          <div className="flex">
            <Link
              href={`/products/${item.productId}`}
              className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md"
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="ml-4 flex flex-col">
              <Link
                href={`/products/${item.productId}`}
                className="font-medium text-gray-800 transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
              <button
                onClick={() => handleRemoveItem(item.productId)}
                className="mt-2 flex items-center self-start text-sm text-red-500 hover:text-red-700"
              >
                <i className="bx bx-trash mr-1"></i>
                <span>Xóa</span>
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-2 flex items-center justify-between md:justify-center">
          <span className="font-medium text-gray-700 md:hidden">Giá:</span>
          <span className="text-gray-800">{item.price.toLocaleString()}₫</span>
        </div>

        <div className="col-span-2 my-3 flex items-center justify-between md:my-0 md:justify-center">
          <span className="font-medium text-gray-700 md:hidden">Số lượng:</span>
          <div className="flex items-center rounded border border-gray-300">
            <button
              className="px-2 py-1 text-gray-500 hover:text-gray-700"
              onClick={() =>
                handleQuantityChange(item.productId, item.quantity - 1)
              }
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(
                  item.productId,
                  parseInt(e.target.value) || 1,
                )
              }
              className="w-12 py-1 text-center focus:outline-none"
            />
            <button
              className="px-2 py-1 text-gray-500 hover:text-gray-700"
              onClick={() =>
                handleQuantityChange(item.productId, item.quantity + 1)
              }
            >
              +
            </button>
          </div>
        </div>

        <div className="col-span-2 flex items-center justify-between md:justify-end">
          <span className="font-medium text-gray-700 md:hidden">Tổng:</span>
          <span className="font-medium text-primary">
            {(item.price * item.quantity).toLocaleString()}₫
          </span>
        </div>
      </div>
    </div>
  );
}
