import { Category } from "@/types/index";
import React from "react";

interface CategoryFormFieldsProps {
  formData: Partial<Category>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Category>>>;
  categories: Category[];
  currentCategory: Category | null;
}

export default function CategoryFormFields({
  formData,
  setFormData,
  categories,
  currentCategory,
}: CategoryFormFieldsProps) {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (
      name === "name" &&
      (!formData.slug || formData.slug === currentCategory?.slug)
    ) {
      setFormData({
        ...formData,
        name: value,
        slug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      });
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else if (type === "number") {
      setFormData({
        ...formData,
        [name]:
          name === "categoryId"
            ? parseInt(value)
            : value
              ? parseFloat(value)
              : null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Tên danh mục *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Slug *
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            URL-friendly tên danh mục, tự động tạo từ tên
          </p>
        </div>

        <div className="col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            URL hình ảnh chính *
          </label>
          <input
            type="text"
            name="image"
            value={formData.image || ""}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Mô tả
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleInputChange}
          rows={4}
          className="w-full rounded-md border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
      </div>
    </>
  );
}
