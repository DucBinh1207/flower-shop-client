import { CartItem } from "@/types/index";
import Link from "next/link";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  isProcessing: boolean;
  onCheckout: () => void;
}

export default function OrderSummary({
  items,
  subtotal,
  shippingFee,
  isProcessing,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Đơn hàng của bạn</h2>
      <div className="mb-4">
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between py-3"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="ml-3">
                  <p className="text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">SL: {item.quantity}</p>
                </div>
              </div>
              <div className="font-medium text-gray-800">
                {(item.price * item.quantity).toLocaleString()}₫
              </div>
            </div>
          ))}
        </div>
      </div>
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
        <div className="flex justify-between py-4">
          <span className="font-semibold text-gray-800">Tổng cộng:</span>
          <span className="text-xl font-bold text-primary">
            {(subtotal + shippingFee).toLocaleString()}₫
          </span>
        </div>
      </div>
      <div className="mt-6">
        <button
          type="button"
          onClick={onCheckout}
          className="btn-primary flex w-full items-center justify-center py-3"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <svg
                className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Đang xử lý...
            </>
          ) : (
            "Đặt hàng"
          )}
        </button>
        <p className="mt-4 text-center text-sm text-gray-500">
          Bằng cách nhấn nút Đặt hàng, bạn đồng ý với
          <a
            href="/terms"
            className="ml-1 text-primary"
          >
            Điều khoản dịch vụ
          </a>{" "}
          của chúng tôi.
        </p>
      </div>
    </div>
  );
}
