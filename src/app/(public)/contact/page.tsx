"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Gửi thành công!",
        description:
          "Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.",
      });

      reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">
          Liên Hệ Với Chúng Tôi
        </h1>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <i className="bx bx-map-pin text-3xl text-primary"></i>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Địa Chỉ
            </h3>
            <p className="text-gray-600">
              Số 123 Đường ABC, Quận XYZ
              <br />
              Thành phố Hồ Chí Minh, Việt Nam
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <i className="bx bx-phone text-3xl text-primary"></i>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Điện Thoại
            </h3>
            <p className="text-gray-600">
              Hotline: 0123.456.789
              <br />
              Hỗ trợ kỹ thuật: 0987.654.321
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
              <i className="bx bx-envelope text-3xl text-primary"></i>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600">
              info@seedbloom.vn
              <br />
              support@seedbloom.vn
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm md:p-8">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">
              Gửi Tin Nhắn Cho Chúng Tôi
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-gray-700">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    className={`w-full border p-3 ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    placeholder="Nguyễn Văn A"
                    {...register("name", { required: "Vui lòng nhập họ tên" })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-gray-700">Email *</label>
                  <input
                    type="email"
                    className={`w-full border p-3 ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    placeholder="your.email@example.com"
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

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className={`w-full border p-3 ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    placeholder="0912345678"
                    {...register("phone", {
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

                <div>
                  <label className="mb-1 block text-gray-700">Chủ đề *</label>
                  <select
                    className={`w-full border p-3 ${errors.subject ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    {...register("subject", {
                      required: "Vui lòng chọn chủ đề",
                    })}
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="customer_support">Hỗ trợ khách hàng</option>
                    <option value="order_inquiry">Thắc mắc về đơn hàng</option>
                    <option value="product_question">
                      Câu hỏi về sản phẩm
                    </option>
                    <option value="partnership">Hợp tác kinh doanh</option>
                    <option value="other">Khác</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-1 block text-gray-700">Tin nhắn *</label>
                <textarea
                  rows={5}
                  className={`w-full border p-3 ${errors.message ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                  placeholder="Nội dung tin nhắn..."
                  {...register("message", {
                    required: "Vui lòng nhập nội dung tin nhắn",
                    minLength: {
                      value: 10,
                      message:
                        "Tin nhắn quá ngắn, vui lòng nhập ít nhất 10 ký tự",
                    },
                  })}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary flex items-center justify-center px-6 py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <i className="bx bx-send mr-2"></i>
                    Gửi tin nhắn
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            <div className="mb-6 rounded-lg bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Giờ làm việc
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Thứ Hai - Thứ Sáu:</span>
                  <span className="font-medium">8:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Thứ Bảy:</span>
                  <span className="font-medium">8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chủ Nhật:</span>
                  <span className="font-medium">9:00 - 17:00</span>
                </div>
              </div>
            </div>

            <div className="mb-6 rounded-lg bg-white p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Theo dõi chúng tôi
              </h2>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="rounded-full bg-blue-500 p-3 text-white transition-colors hover:bg-blue-600"
                >
                  <i className="bx bxl-facebook text-xl"></i>
                </a>
                <a
                  href="#"
                  className="rounded-full bg-pink-500 p-3 text-white transition-colors hover:bg-pink-600"
                >
                  <i className="bx bxl-instagram text-xl"></i>
                </a>
                <a
                  href="#"
                  className="rounded-full bg-red-500 p-3 text-white transition-colors hover:bg-red-600"
                >
                  <i className="bx bxl-youtube text-xl"></i>
                </a>
                <a
                  href="#"
                  className="rounded-full bg-gray-800 p-3 text-white transition-colors hover:bg-black"
                >
                  <i className="bx bxl-tiktok text-xl"></i>
                </a>
              </div>
            </div>

            <div className="rounded-lg bg-primary/10 p-6 text-center">
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                Cần trợ giúp khẩn cấp?
              </h3>
              <p className="mb-4 text-gray-700">
                Hãy gọi cho đường dây nóng của chúng tôi
              </p>
              <a
                href="tel:0123456789"
                className="flex items-center justify-center text-2xl font-bold text-primary"
              >
                <i className="bx bx-phone-call mr-2"></i>
                0123.456.789
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-lg shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197356!2d106.68802921532072!3d10.778789392319668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f24fe0ddac5%3A0x928b04efb51b623d!2zMTIzIMSQLiBOZ3V54buFbiBUaMOhaSBIb2MsIELhur9uIFRow6BuaCwgUXXhuq1uIDEsIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1662536781044!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SeedBloom location"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
