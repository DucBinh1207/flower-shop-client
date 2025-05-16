"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { useCartStore } from "src/store/cartStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/components/contexts/session";
import { Order, OrderItem, VietnamAddressData } from "@/types/index";
import { order } from "@/api/order-api";
import { useMutation } from "@tanstack/react-query";

import rawData from "../../../../../public/json/tree.json";

type PaymentMethod = "cod" | "bank_transfer" ;

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

  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>(
    [],
  );
  const [districts, setDistricts] = useState<{ code: string; name: string }[]>(
    [],
  );
  const [wards, setWards] = useState<{ code: string; name: string }[]>([]);

  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState("");

  const data = rawData as VietnamAddressData;
  const addressData: VietnamAddressData = data;

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedProvinceCode(code);
    setSelectedDistrictCode("");
    setWards([]);

    const selectedProvince = addressData[code];
    if (selectedProvince) {
      const districtList = Object.entries(selectedProvince["quan-huyen"]).map(
        ([code, value]) => ({
          code,
          name: value.name,
        }),
      );
      setDistricts(districtList);
    }
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    setSelectedDistrictCode(code);
    const selectedDistrict =
      addressData[selectedProvinceCode] &&
      addressData[selectedProvinceCode]["quan-huyen"][code];
    if (selectedDistrict) {
      const wardList = Object.entries(selectedDistrict["xa-phuong"]).map(
        ([code, value]) => ({
          code,
          name: value.name,
        }),
      );
      setWards(wardList);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: order,
    onSuccess: (response) => {
      const paymentMethodText =
        paymentMethod === "cod"
          ? "COD - Thanh toán khi nhận hàng"
          : "Chuyển khoản online";

      const data = getValues();
      const fullAddress = `${data.address}, ${data.ward}, ${data.district}, ${data.city}`;

      if (paymentMethod === "bank_transfer") {
        window.location.href = response.data.paymentData;
        clearCart();
      } else {
        clearCart();
        setTimeout(() => {
          router.push(
            `/order-success?orderNumber=XXXX&total=${subtotal + shippingFee}&email=${encodeURIComponent(data.email)}&address=${encodeURIComponent(fullAddress)}&payment=${encodeURIComponent(paymentMethodText)}`,
          );
        }, 100);

        toast({
          title: "Đặt hàng thành công!",
          description: "Đơn hàng đã được tạo. Cảm ơn bạn đã mua hàng!",
        });
      }
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
    const provinceList = Object.entries(addressData).map(([code, value]) => ({
      code,
      name: value.name,
    }));
    setProvinces(provinceList);

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
                {/* Province */}
                <div>
                  <label className="mb-1 block text-gray-700">
                    Tỉnh/Thành phố *
                  </label>
                  <select
                    className={`w-full border p-2 ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    } rounded`}
                    {...register("city", {
                      required: "Vui lòng chọn tỉnh/thành phố",
                    })}
                    onChange={handleProvinceChange}
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map((item) => (
                      <option
                        key={item.code}
                        value={item.code}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-sm text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-gray-700">
                    Quận/Huyện *
                  </label>
                  <select
                    className={`w-full border p-2 ${
                      errors.district ? "border-red-500" : "border-gray-300"
                    } rounded`}
                    {...register("district", {
                      required: "Vui lòng chọn quận/huyện",
                    })}
                    onChange={handleDistrictChange}
                  >
                    <option value="">Chọn quận/huyện</option>
                    {districts.map((item) => (
                      <option
                        key={item.code}
                        value={item.code}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="text-sm text-red-500">
                      {errors.district.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-gray-700">
                    Phường/Xã *
                  </label>
                  <select
                    className={`w-full border p-2 ${
                      errors.ward ? "border-red-500" : "border-gray-300"
                    } rounded`}
                    {...register("ward", {
                      required: "Vui lòng chọn phường/xã",
                    })}
                  >
                    <option value="">Chọn phường/xã</option>
                    {wards.map((item) => (
                      <option
                        key={item.code}
                        value={item.code}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.ward && (
                    <p className="text-sm text-red-500">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-6 w-auto"
                      viewBox="0 0 576 512"
                    >
                      <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm64 320l-64 0 0-64c35.3 0 64 28.7 64 64zM64 192l0-64 64 0c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64l0 64-64 0zm64-192c-35.3 0-64-28.7-64-64l64 0 0 64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                    </svg>
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
                      Thanh toán trực tuyến (online)
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-6 w-auto"
                      viewBox="0 0 576 512"
                    >
                      <path d="M64 32C28.7 32 0 60.7 0 96l0 32 576 0 0-32c0-35.3-28.7-64-64-64L64 32zM576 224L0 224 0 416c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-192zM112 352l64 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm112 16c0-8.8 7.2-16 16-16l128 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-128 0c-8.8 0-16-7.2-16-16z" />
                    </svg>
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
                </Link>
                của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
