import React from "react";
import ProductStatusBadges from "./badge";
import { Category, Product } from "@/types/index";

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductTable({
  products,
  categories,
  onEdit,
  onDelete,
}: ProductTableProps) {
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
                Tên sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Danh mục
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Giá
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Tồn kho
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                  {product.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-12 w-12 overflow-hidden rounded-md">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">{product.name}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {categories.find((c) => c.id === product.categoryId)?.name ||
                    ""}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="flex flex-col">
                    <span className="font-medium text-primary">
                      {product.price.toLocaleString()}₫
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">
                        {product.originalPrice.toLocaleString()}₫
                      </span>
                    )}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <ProductStatusBadges product={product} />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => onEdit(product)}
                    >
                      <i className="bx bx-edit text-xl"></i>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDelete(product)}
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
      {products.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <i className="bx bx-package mb-2 text-5xl"></i>
          <p>Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}
