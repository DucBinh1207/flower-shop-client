"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { updateMyProfile } from "@/api/auth-api";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/contexts/session";

// Define validation schema with Zod
const profileSchema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập họ tên" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z
    .string()
    .regex(/^[0-9]{10,11}$/, { message: "Số điện thoại không hợp lệ" })
    .optional()
    .or(z.literal("")),
  address: z.string().optional(),
  avatar: z
    .string()
    .url({ message: "URL không hợp lệ" })
    .optional()
    .or(z.literal("")),
});

// Create type from schema
type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileInfoFormProps {
  isEditing: boolean;
  onEditComplete: () => void;
}

export default function ProfileInfoForm({
  isEditing,
  onEditComplete,
}: ProfileInfoFormProps) {
  const { user, updateUser } = useSession();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: updateMyProfile,
    onSuccess: (res) => {
      toast({
        title: "Cập nhật thành công",
        description: "Thông tin tài khoản của bạn đã được cập nhật",
      });
        updateUser(res.user);
        onEditComplete()
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    values: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address ||"",
      avatar: user?.avatar || "",
    },
  });

  // Watch avatar URL for preview
  const avatarValue = watch("avatar");

  const onProfileSubmit = (data: ProfileFormData) => {
    mutate(data);
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit(onProfileSubmit)}>
        <div className="mb-6 flex flex-col gap-6 md:flex-row">
          <div className="flex w-full flex-col items-center md:w-1/3">
            <div className="mb-4 h-32 w-32 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
              {avatarValue ? (
                <img
                  src={avatarValue}
                  alt="Avatar preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/api/placeholder/128/128";
                  }}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="w-full">
              <label className="mb-1 block text-gray-700">
                URL ảnh đại diện
              </label>
              <input
                type="text"
                className={`w-full border p-3 ${errors.avatar ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
                placeholder="https://example.com/avatar.jpg"
                {...register("avatar")}
              />
              {errors.avatar && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.avatar.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Nhập URL ảnh đại diện của bạn
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-gray-700">Họ tên</label>
                <input
                  type="text"
                  className={`w-full border p-3 ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
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
                  disabled
                  className="w-full rounded-lg border border-gray-300 bg-gray-100 p-3"
                  {...register("email")}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Email không thể thay đổi
                </p>
              </div>
              <div>
                <label className="mb-1 block text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  className={`w-full border p-3 ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-lg focus:border-primary focus:outline-none`}
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
                  {...register("address")}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="mr-3 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            onClick={onEditComplete}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
            disabled={isPending}
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-start">
      <div className="mr-6">
        <div className="h-24 w-24 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/api/placeholder/96/96";
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">Họ tên</p>
            <p className="font-medium">{user?.name }</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Số điện thoại</p>
            <p className="font-medium">{user?.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Địa chỉ</p>
            <p className="font-medium">{user?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
