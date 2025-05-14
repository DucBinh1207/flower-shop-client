"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Route } from "next";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth-api";
import { saveAuthTokenForInternalServer } from "@/api/internal-auth-token-api";
import { useSession } from "@/components/contexts/session";

interface LoginForm {
  email: string;
  password: string;
}

export default function PageContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useSession();
  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      try {
        await saveAuthTokenForInternalServer({
          accessToken: data.tokens.accessToken,
        });
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn quay trở lại!",
        });
        updateUser(data.user);
      } catch (error) {
        toast({
          title: "Đăng nhập thất bại",
          description: "Email hoặc mật khẩu không đúng.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setIsLoading(false);
      toast({
        title: "Đăng nhập thất bại",
        description: "Email hoặc mật khẩu không đúng.",
        variant: "destructive",
      });
    },
  });
  const { isAuthenticated } = useSession();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${redirectTo}` as Route);
    }
  }, [isAuthenticated, router, redirectTo]);

  const onSubmit = async (data: LoginForm) => {
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
                <i className="bx bxs-leaf text-3xl text-primary" />
                <span className="ml-2 font-montserrat text-2xl font-bold text-primary">
                  SeedBloom
                </span>
              </Link>
              <h1 className="mt-6 text-2xl font-bold text-gray-800">
                Đăng nhập
              </h1>
              <p className="mt-2 text-gray-600">
                Đăng nhập để tiếp tục mua sắm
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-gray-700">Email</label>
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

                <div>
                  <div className="mb-1 flex justify-between">
                    <label className="text-gray-700">Mật khẩu</label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <input
                    type="password"
                    className={`w-full border p-3 ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Vui lòng nhập mật khẩu",
                      minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Ghi nhớ đăng nhập
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary mt-6 flex w-full items-center justify-center py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <React.Fragment>
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Đang xử lý...
                  </React.Fragment>
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Chưa có tài khoản?{" "}
                <Link
                  href="/register"
                  className="text-primary hover:underline"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">
                    Hoặc đăng nhập bằng
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <i className="bx bxl-facebook text-xl text-blue-600" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <i className="bx bxl-google text-xl text-red-500" />
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <i className="bx bxl-apple text-xl text-black" />
                </a>
              </div>
            </div>
          </div>

          {/* Demo accounts */}
          <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="mb-2 font-semibold text-blue-800">
              Tài khoản demo:
            </h3>
            <p className="mb-1 text-sm text-blue-700">
              Admin: admin@seedbloom.vn / admin123
            </p>
            <p className="text-sm text-blue-700">
              Khách hàng: nguyenquocdung@gmail.com / dung123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
