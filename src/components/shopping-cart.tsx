import Link from "next/link";
import React, { useEffect, useRef } from "react";

import { useCartStore } from "src/store/cartStore";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { items, updateItemQuantity, removeItem, clearCart } = useCartStore();
  const cartRef = useRef<HTMLDivElement>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shippingFee = subtotal >= 300000 ? 0 : 30000; // Free shipping for orders above 300,000₫
  const total = subtotal + shippingFee;

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed right-0 top-0 z-50 h-full w-full transform bg-white shadow-xl transition-transform duration-300 md:w-96 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      ref={cartRef}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h3 className="flex items-center text-lg font-semibold">
            <i className="bx bx-cart mr-2 text-xl text-primary" />
            <span>Giỏ hàng ({items.length})</span>
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <i className="bx bx-x text-2xl" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-grow flex-col items-center justify-center p-4 text-center">
            <i className="bx bx-cart mb-4 text-6xl text-gray-300" />
            <p className="mb-6 text-gray-500">Giỏ hàng của bạn đang trống</p>
            <Link
              href="/"
              className="rounded-full bg-primary px-4 py-2 text-white transition-colors hover:bg-primary-dark"
              onClick={onClose}
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <React.Fragment>
            <div className="scrollbar-hide flex-grow space-y-4 overflow-y-auto p-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center border-b border-gray-100 pb-4"
                >
                  <Link
                    href={`/products/${item.productId}`}
                    onClick={onClose}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                  </Link>
                  <div className="ml-4 flex-grow">
                    <Link
                      href={`/products/${item.productId}`}
                      className="text-sm font-medium text-gray-800 transition-colors hover:text-primary"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="font-medium text-primary">
                        {item.price.toLocaleString()}₫
                      </span>
                      <div className="flex items-center rounded border border-gray-300">
                        <button
                          className="px-2 py-1 text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            updateItemQuantity(
                              item.productId,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1 text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            updateItemQuantity(
                              item.productId,
                              item.quantity + 1,
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="ml-2 text-gray-400 hover:text-red-500"
                    onClick={() => removeItem(item.productId)}
                  >
                    <i className="bx bx-trash" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4">
              <div className="mb-2 flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="font-medium">
                  {subtotal.toLocaleString()}₫
                </span>
              </div>
              <div className="mb-4 flex justify-between">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span className="font-medium">
                  {shippingFee === 0
                    ? "Miễn phí"
                    : `${shippingFee.toLocaleString()}₫`}
                </span>
              </div>
              <div className="mb-6 flex justify-between text-lg font-semibold">
                <span>Tổng cộng:</span>
                <span className="text-primary">{total.toLocaleString()}₫</span>
              </div>

              <div className="space-y-3">
                <Link
                  href="/checkout"
                  className="block w-full rounded-full bg-primary px-4 py-3 text-center font-medium text-white transition-colors hover:bg-primary-dark"
                  onClick={onClose}
                >
                  Thanh toán ngay
                </Link>
                <Link
                  href="/cart"
                  className="block w-full rounded-full border border-primary bg-white px-4 py-3 text-center font-medium text-primary transition-colors hover:bg-gray-100"
                  onClick={onClose}
                >
                  Xem giỏ hàng
                </Link>
                <button
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                  onClick={clearCart}
                >
                  Xóa tất cả sản phẩm
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
