import React, { useState } from "react";
import CategoryFormFields from "./form";
import { Category } from "@/types/index";


interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<Category>) => void;
  currentCategory: Category | null;
  initialFormData: Partial<Category>;
  categories: Category[];
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  currentCategory,
  initialFormData,
  categories,
}: CategoryModalProps) {
  const [formData, setFormData] = useState<Partial<Category>>(initialFormData);

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
              {currentCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
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
            <CategoryFormFields
              formData={formData}
              setFormData={setFormData}
              categories={categories}
              currentCategory={currentCategory}
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
                {currentCategory ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
