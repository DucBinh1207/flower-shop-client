"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "@/api/auth-api";
import { useSession } from "@/components/contexts/session";

// Define schema with Zod
const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Họ tên phải có ít nhất 3 ký tự" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    phone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, {
      message: "Số điện thoại không hợp lệ",
    }),
    address: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" }),
    password: z
      .string()
      .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  })
  .refine((data) => data.acceptTerms === true, {
    message: "Bạn cần đồng ý với Điều khoản dịch vụ và Chính sách bảo mật",
    path: ["acceptTerms"],
  });

// Infer TypeScript type from schema
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function PageContent() {
  const router = useRouter();
  const { isAuthenticated } = useSession();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      setIsLoading(false);
      toast({
        title: "Đăng ký thành công",
        description: "Chào mừng bạn đến với SeedBloom!",
      });
      router.push("/login");
    },
    onError: () => {
      setIsLoading(false);
      toast({
        title: "Đăng ký thất bại",
        description:
          "Email đã tồn tại trong hệ thống. Vui lòng thử lại với email khác.",
        variant: "destructive",
      });
    },
  });
  // Initialize form with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "Dungnq",
      email: "admin@seedbloom.vn",
      phone: "0971934862",
      address: "Da nang",
      password: "admin123",
      confirmPassword: "admin123",
      acceptTerms: true,
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = (data: RegisterFormValues) => {
    setIsLoading(true);
    mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="mb-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center"
              >
                <i className="bx bxs-leaf text-3xl text-primary"></i>
                <span className="ml-2 font-montserrat text-2xl font-bold text-primary">
                  SeedBloom
                </span>
              </Link>
              <h1 className="mt-6 text-2xl font-bold text-gray-800">
                Tạo tài khoản
              </h1>
              <p className="mt-2 text-gray-600">
                Tạo tài khoản để mua sắm dễ dàng hơn
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-gray-700">Họ và tên</label>
                  <input
                    type="text"
                    className={`w-full border p-3 ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    placeholder="Nguyễn Văn A"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-gray-700">Email</label>
                  <input
                    type="email"
                    className={`w-full border p-3 ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    placeholder="your.email@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    className={`w-full border p-3 ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    placeholder="0912345678"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-gray-700">Địa chỉ</label>
                  <input
                    type="text"
                    className={`w-full border p-3 ${errors.address ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    placeholder="123 Đường ABC, Phường XYZ, Quận/Huyện, Thành phố"
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-gray-700">Mật khẩu</label>
                  <input
                    type="password"
                    className={`w-full border p-3 ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-gray-700">
                    Nhập lại mật khẩu
                  </label>
                  <input
                    type="password"
                    className={`w-full border p-3 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="accept-terms"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    {...register("acceptTerms")}
                  />
                  <label
                    htmlFor="accept-terms"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Tôi đồng ý với{" "}
                    <Link
                      href="/"
                      className="text-primary hover:underline"
                    >
                      Điều khoản dịch vụ
                    </Link>{" "}
                    và{" "}
                    <Link
                      href="/"
                      className="text-primary hover:underline"
                    >
                      Chính sách bảo mật
                    </Link>
                  </label>
                  {errors.acceptTerms && (
                    <p className="ml-2 text-sm text-red-500">
                      {errors.acceptTerms.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary mt-6 flex w-full items-center justify-center py-3"
                disabled={isLoading}
              >
                {isLoading ? (
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
                  "Đăng ký"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Hoặc đăng ký bằng
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <i className="bx bxl-facebook text-xl text-blue-600"></i>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <i className="bx bxl-google text-xl text-red-500"></i>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <i className="bx bxl-apple text-xl text-black"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
