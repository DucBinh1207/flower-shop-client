import React, { useState } from "react";
import { User } from "@/types/index";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
}

export default function UserModal({
  isOpen,
  onClose,
  currentUser,
}: UserModalProps) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white shadow-lg">
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Thông tin người dùng
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
              aria-label="Đóng modal"
            >
              <i className="bx bx-x text-2xl"></i>
            </button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <img
              src={currentUser?.avatar || "/default-avatar.png"}
              alt={currentUser?.name}
              className="h-36 w-36 rounded-full border border-gray-300 object-cover"
            />

            <div className="w-full">
              <p className="mb-2 text-sm">
                <span className="font-semibold">Tên:</span> {currentUser?.name}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-semibold">Email:</span>{" "}
                {currentUser?.email}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-semibold">Số điện thoại:</span>{" "}
                {currentUser?.phone}
              </p>
              <p className="mb-2 text-sm">
                <span className="font-semibold">Địa chỉ:</span>{" "}
                {currentUser?.address}
              </p>

              <p className="mb-2 text-sm">
                <span className="font-semibold">Trạng thái:</span>{" "}
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    currentUser?.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {currentUser?.status === "active"
                    ? "Hoạt động"
                    : "Đã khóa"}
                </span>
              </p>

              <p className="mb-2 text-sm">
                <span className="font-semibold">Vai trò:</span>{" "}
                <span className="capitalize">{currentUser?.role ==="admin" ? "Quản trị viên" : "Khách hàng"}</span>
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
