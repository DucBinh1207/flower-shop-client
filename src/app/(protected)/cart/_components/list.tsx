"use client";

import Link from "next/link";
import Item from "./cart-item";
import { CartItem } from "src/store/cartStore";

interface CartItemListProps {
  items: CartItem[];
  clearCart: () => void;
}

export default function CartItemList({ items, clearCart }: CartItemListProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="hidden grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 p-4 md:grid">
        <div className="col-span-6">
          <span className="font-medium text-gray-700">Sản phẩm</span>
        </div>
        <div className="col-span-2 text-center">
          <span className="font-medium text-gray-700">Giá</span>
        </div>
        <div className="col-span-2 text-center">
          <span className="font-medium text-gray-700">Số lượng</span>
        </div>
        <div className="col-span-2 text-right">
          <span className="font-medium text-gray-700">Tổng</span>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {items.map((item) => (
          <Item
            key={item.productId}
            item={item}
          />
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-4">
        <Link
          href="/"
          className="flex items-center text-primary hover:text-primary-dark"
        >
          <i className="bx bx-left-arrow-alt mr-1"></i>
          <span>Tiếp tục mua sắm</span>
        </Link>
        <button
          onClick={clearCart}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <i className="bx bx-trash mr-1"></i>
          <span>Xóa tất cả</span>
        </button>
      </div>
    </div>
  );
}
