"use client";

import { useState } from "react";
import Image from "next/image";

interface OrderSummaryProps {
  subtotal: number;
  shippingFee: number;
  handleCheckout: () => void;
}

export default function OrderSummary({
  subtotal,
  shippingFee,
  handleCheckout,
}: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState("");

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-800">Tóm tắt đơn hàng</h2>

      <div className="divide-y divide-gray-200">
        <div className="flex justify-between py-3">
          <span className="text-gray-600">Tạm tính:</span>
          <span className="font-medium">{subtotal.toLocaleString()}₫</span>
        </div>
        <div className="flex justify-between py-3">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="font-medium">
            {shippingFee === 0
              ? "Miễn phí"
              : `${shippingFee.toLocaleString()}₫`}
          </span>
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-gray-600">Mã giảm giá:</span>
          <div className="flex">
            <input
              type="text"
              placeholder="Nhập mã"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="rounded-l border border-gray-300 p-2 text-sm focus:border-primary focus:outline-none"
            />
            <button className="rounded-r bg-primary px-3 py-2 text-sm text-white transition-colors hover:bg-primary-dark">
              Áp dụng
            </button>
          </div>
        </div>
        <div className="flex justify-between py-4">
          <span className="font-semibold text-gray-800">Tổng cộng:</span>
          <span className="text-xl font-bold text-primary">
            {(subtotal + shippingFee).toLocaleString()}₫
          </span>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleCheckout}
          className="btn-primary w-full py-3"
        >
          Tiến hành thanh toán
        </button>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative h-8 w-8">
            <Image
              src="/images/payment/visa.png"
              alt="Visa"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-8 w-8">
            <Image
              src="/images/payment/mastercard.png"
              alt="Mastercard"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-8 w-8">
            <Image
              src="/images/payment/paypal.png"
              alt="Paypal"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative h-8 w-8">
            <Image
              src="/images/payment/cod.png"
              alt="COD"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
