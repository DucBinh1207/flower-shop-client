import React from "react";

interface BanConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBan: () => void;
  username: string;
}

export default function BanConfirmationModal({
  isOpen,
  onClose,
  onBan,
  username,
}: BanConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="p-6">
          <div className="mb-4 flex items-center text-red-600">
            <i className="bx bx-error-circle mr-2 text-3xl"></i>
            <h2 className="text-xl font-semibold">Xác nhận khóa</h2>
          </div>

          <p className="mb-6 text-gray-700">
            Bạn có chắc chắn muốn khóa người dùng{" "}
            <span className="font-semibold">{username}</span>?
          </p>

          <div className="flex justify-end space-x-3">
            <button
              className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              onClick={onBan}
            >
              Khóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
