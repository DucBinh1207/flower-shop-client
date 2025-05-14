"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useCartStore } from "src/store/cartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/components/contexts/session";
import { Order, OrderItem } from "@/types/index";
import { order } from "@/api/order-api";
import { useMutation } from "@tanstack/react-query";

type PaymentMethod = "cod" | "bank_transfer" | "credit_card";

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes: string;
}

export default function PageContent() {
  const { items, clearCart } = useCartStore();
  const { user, isAuthenticated } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(30000);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");

  const { mutate, isPending } = useMutation({
    mutationFn: order,
    onSuccess: (response) => {
      const paymentMethodText =
        paymentMethod === "cod"
          ? "COD - Thanh toán khi nhận hàng"
          : paymentMethod === "bank_transfer"
            ? "Chuyển khoản ngân hàng"
            : "Thẻ tín dụng/ghi nợ";

      const data = getValues();
      const fullAddress = `${data.address}, ${data.ward}, ${data.district}, ${data.city}`;

      clearCart();
      //TODO: update later
      router.push(
        `/order-success?orderNumber=XXXX&total=${subtotal + shippingFee}&email=${encodeURIComponent(data.email)}&address=${encodeURIComponent(fullAddress)}&payment=${encodeURIComponent(paymentMethodText)}`,
      );
      toast({
        title: "Đặt hàng thành công!",
        description: "Đơn hàng đã được tạo. Cảm ơn bạn đã mua hàng!",
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CheckoutForm>();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=checkout");
      return;
    }

    if (items.length === 0) {
      router.push("/cart");
      return;
    }

    // Calculate subtotal
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setSubtotal(total);

    // Adjust shipping fee based on subtotal
    if (total >= 300000) {
      setShippingFee(0); // Free shipping for orders above 300,000₫
    } else {
      setShippingFee(30000);
    }

    // Pre-fill form with user user if available
    if (user) {
      setValue("fullName", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);
      setValue("address", user.address);
    }
  }, [items, isAuthenticated, router, setValue]);

  const onSubmit = (data: CheckoutForm) => {
    const orderId = `SB${Date.now()}`;
    const itemFormatted: OrderItem[] = items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      productName: item.name,
      productImage: item.image,
      price: item.price,
      subtotal: item.price * item.quantity,
      orderId,
    }));
    const orderDetails: Order = {
      items: itemFormatted,
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
      paymentMethod,
      orderId,
      userId: user?.id!,
      customerName: data.fullName,
      customerEmail: data.email,
      customerPhone: data.phone,
      shippingAddress: data.address,
      status: "pending",
      paymentStatus: "pending",
      discount: 0,
      notes: data.notes,
    };

    mutate(orderDetails);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
        Thanh toán
      </h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">
                Thông tin giao hàng
              </h2>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-gray-700">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    className={`w-full border p-2 ${errors.fullName ? "border-red-500" : "border-gray-300"} rounded focus:border-primary focus:outline-none`}
                    {...register("fullName", {
                      required: "Vui lòng nhập họ tên",
                    })}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-gray-700">Email *</label>
                  <input
                    type="email"
                    className={`w-full border p-2 ${errors.email ? "border-red-500" : "border-gray-300"} rounded focus:border-primary focus:outline-none`}
                    {...register("email", {
                      required: "Vui lòng nhập email",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email không hợp lệ",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-gray-700">
                  Số điện thoại *
                </label>
                <input
                  type="text"
                  className={`w-full border p-2 ${errors.phone ? "border-red-500" : "border-gray-300"} rounded focus:border-primary focus:outline-none`}
                  {...register("phone", {
                    required: "Vui lòng nhập số điện thoại",
                    pattern: {
                      value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  })}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-gray-700">
                    Tỉnh/Thành phố *
                  </label>
                  <select
                    className={`w-full border p-2 ${errors.city ? "border-red-500" : "border-gray-300"} rounded focus:border-primary focus:outline-none`}
                    {...register("city", {
                      required: "Vui lòng chọn tỉnh/thành phố",
                    })}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    <option value="HN">Hà Nội</option>
                    <option value="HCM">TP. Hồ Chí Minh</option>
                    <option value="DN">Đà Nẵng</option>
                    <option value="HP">Hải Phòng</option>
                  </select>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-gray-700">
                    Quận/Huyện *
                  </label>
                  <select
                    className={`w-full border p-2 ${errors.district ? "border-red-500" : "border-gray-300"} rounded focus:border-primary focus:outline-none`}
                    {...register("district", {
                      required: "Vui lòng chọn quận/huyện",
                    })}
                  >
                    <option value="">Chọn quận/huyện</option>
                    <option value="D1">Quận 1</option>
                    <option value="D2">Quận 2</option>
                    <option value="D3">Quận 3</option>
                    <option value="D4">Quận 4</option>
                  </select>
                  {errors.district && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.district.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-gray-700">
                    Phường/Xã *
                  </label>
                  <select
                    className={`w-full border p-2 ${errors.ward ? "border-red-500" : "border-gray-300"} rounded focus:border-primary focus:outline-none`}
                    {...register("ward", {
                      required: "Vui lòng chọn phường/xã",
                    })}
                  >
                    <option value="">Chọn phường/xã</option>
                    <option value="W1">Phường 1</option>
                    <option value="W2">Phường 2</option>
                    <option value="W3">Phường 3</option>
                    <option value="W4">Phường 4</option>
                  </select>
                  {errors.ward && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.ward.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1 block text-gray-700">
                  Địa chỉ chi tiết *
                </label>
                <input
                  type="text"
                  className={`w-full border p-2 ${errors.address ? "border-red-500" : "border-gray-300"} rounded focus:border-primary focus:outline-none`}
                  placeholder="Số nhà, tên đường, tòa nhà, ..."
                  {...register("address", {
                    required: "Vui lòng nhập địa chỉ chi tiết",
                  })}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-gray-700">
                  Ghi chú (không bắt buộc)
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded border border-gray-300 p-2 focus:border-primary focus:outline-none"
                  placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết."
                  {...register("notes")}
                ></textarea>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold">
                Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                <div className="flex items-center rounded border border-gray-200 p-3">
                  <input
                    type="radio"
                    id="payment-cod"
                    name="paymentMethod"
                    className="mr-2"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <label
                    htmlFor="payment-cod"
                    className="flex cursor-pointer items-center"
                  >
                    <span className="font-medium text-gray-800">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/64/6033/6033926.png"
                      alt="COD"
                      className="ml-auto h-8 w-auto"
                    />
                  </label>
                </div>

                <div className="flex items-center rounded border border-gray-200 p-3">
                  <input
                    type="radio"
                    id="payment-bank"
                    name="paymentMethod"
                    className="mr-2"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={() => setPaymentMethod("bank_transfer")}
                  />
                  <label
                    htmlFor="payment-bank"
                    className="flex cursor-pointer items-center"
                  >
                    <span className="font-medium text-gray-800">
                      Chuyển khoản ngân hàng
                    </span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/64/2168/2168767.png"
                      alt="Bank Transfer"
                      className="ml-auto h-8 w-auto"
                    />
                  </label>
                </div>

                <div className="flex items-center rounded border border-gray-200 p-3">
                  <input
                    type="radio"
                    id="payment-card"
                    name="paymentMethod"
                    className="mr-2"
                    checked={paymentMethod === "credit_card"}
                    onChange={() => setPaymentMethod("credit_card")}
                  />
                  <label
                    htmlFor="payment-card"
                    className="flex cursor-pointer items-center"
                  >
                    <span className="font-medium text-gray-800">
                      Thẻ tín dụng/ghi nợ
                    </span>
                    <div className="ml-auto flex space-x-2">
                      <img
                        src="https://cdn-icons-png.flaticon.com/64/5968/5968299.png"
                        alt="Visa"
                        className="h-8 w-auto"
                      />
                      <img
                        src="https://cdn-icons-png.flaticon.com/64/5968/5968144.png"
                        alt="Mastercard"
                        className="h-8 w-auto"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Đơn hàng của bạn</h2>

            <div className="mb-4">
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div
                    key={item.productId}
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
                        <p className="text-sm text-gray-500">
                          SL: {item.quantity}
                        </p>
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
                <span className="font-medium">
                  {subtotal.toLocaleString()}₫
                </span>
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
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="btn-primary flex w-full items-center justify-center py-3"
                disabled={isPending}
              >
                {isPending ? (
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
                <Link
                  href="/"
                  className="ml-1 text-primary"
                >
                  Điều khoản dịch vụ
                </Link>{" "}
                của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
