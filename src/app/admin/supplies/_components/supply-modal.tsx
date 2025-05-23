import React, { useState } from "react";
import SupplyFormFields from "./form";
import { Supplier } from "@/types/index";


interface SupplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<Supplier>) => void;
  currentSupply: Supplier | null;
  initialFormData: Partial<Supplier>;
  supplies: Supplier[];
}

export default function SupplyModal({
  isOpen,
  onClose,
  onSubmit,
  currentSupply,
  initialFormData,
  supplies,
}: SupplyModalProps) {
  const [formData, setFormData] = useState<Partial<Supplier>>(initialFormData);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-lg">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentSupply ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              <i className="bx bx-x text-2xl"></i>
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <SupplyFormFields
              formData={formData}
              setFormData={setFormData}
            />

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                onClick={onClose}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
              >
                {currentSupply ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
