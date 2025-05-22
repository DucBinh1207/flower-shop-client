import React from "react";
import { Category } from "@/types/index";
import { PageLoading } from "@/components/page-loading";

interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryTable({
  categories,
  isLoading,
  onEdit,
  onDelete,
}: CategoryTableProps) {
  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Hình ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Tên danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Số sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {categories.map((categories) => (
              <tr
                key={categories.id}
                className="hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                  {categories.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-12 w-12 overflow-hidden rounded-md">
                    <img
                      src={categories.image}
                      alt={categories.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">{categories.name}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">
                    {categories.description}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {categories.productCount}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => onEdit(categories)}
                    >
                      <i className="bx bx-edit text-xl"></i>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDelete(categories)}
                    >
                      <i className="bx bx-trash text-xl"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <i className="bx bx-package mb-2 text-5xl"></i>
          <p>Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}
