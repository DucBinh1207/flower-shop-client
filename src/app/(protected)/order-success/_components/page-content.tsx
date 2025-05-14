"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCartStore } from "src/store/cartStore";

export default function PageContent() {
  const { clearCart, items } = useCartStore();
  const searchParams = useSearchParams();

  const orderNumber = searchParams.get("orderNumber");
  const total = searchParams.get("total");
  const email = searchParams.get("email");
  const address = searchParams.get("address");
  const payment = searchParams.get("payment");
  const today = new Date();
  const formattedDate = today.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    if (items.length > 0) {
      clearCart();
    }
  }, []);

  return (
    <div className="px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-lg bg-white p-6 shadow-md md:p-8">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <i className="bx bx-check text-4xl text-green-500"></i>
            </div>
            <h1 className="mb-2 text-2xl font-bold md:text-3xl">
              Đặt hàng thành công!
            </h1>
            <p className="text-gray-600">
              Cảm ơn bạn đã mua sắm tại SeedBloom.
            </p>
          </div>

          <div className="mb-8 rounded-lg border border-gray-200 p-4">
            <div className="mb-4 flex flex-col md:flex-row md:justify-between">
              <div>
                <p className="text-sm text-gray-500">Mã đơn hàng</p>
                <p className="font-semibold">{orderNumber}</p>
              </div>
              <div className="mt-2 md:mt-0">
                <p className="text-sm text-gray-500">Ngày đặt hàng</p>
                <p className="font-semibold">{formattedDate}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="mb-4">
                <p className="mb-1 text-sm text-gray-500">Email</p>
                <p>{email}</p>
              </div>
              <div className="mb-4">
                <p className="mb-1 text-sm text-gray-500">Địa chỉ giao hàng</p>
                <p>{address}</p>
              </div>
              <div className="mb-4">
                <p className="mb-1 text-sm text-gray-500">
                  Phương thức thanh toán
                </p>
                <p>{payment}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-gray-500">
                  Tổng giá trị đơn hàng
                </p>
                <p className="text-lg font-semibold">
                  {(total || 0).toLocaleString("vi-VN")}đ
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-lg bg-blue-50 p-4">
            <div className="flex gap-4">
              <i className="bx bx-info-circle text-xl text-blue-500"></i>
              <div>
                <h3 className="mb-1 font-medium">Thông tin đơn hàng</h3>
                <p className="text-sm text-gray-600">
                  Chúng tôi sẽ gửi email xác nhận đơn hàng và thông tin vận
                  chuyển đến địa chỉ email của bạn. Bạn có thể theo dõi trạng
                  thái đơn hàng trong mục "Đơn hàng của tôi" trên tài khoản của
                  bạn.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 md:flex-row">
            <Link
              href="/"
              className="w-full rounded-md bg-primary px-6 py-3 text-center text-white transition-colors hover:bg-primary-dark md:w-auto"
            >
              Tiếp tục mua sắm
            </Link>
            <Link
              href="/orders"
              className="w-full rounded-md border border-gray-300 px-6 py-3 text-center transition-colors hover:bg-gray-50 md:w-auto"
            >
              Xem đơn hàng của tôi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
