import React from "react";
import { Category, Supplier } from "@/types/index";
import { PageLoading } from "@/components/page-loading";

interface SupplyTableProps {
  supplies: Supplier[];
  isLoading: boolean;
  onEdit: (supply: Supplier) => void;
  onDelete: (supply: Supplier) => void;
}

export default function SupplyTable({
  supplies,
  isLoading,
  onEdit,
  onDelete,
}: SupplyTableProps) {
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
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Địa chỉ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Số điện thoại
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
            {supplies.map((supplies) => (
              <tr
                key={supplies.id}
                className="hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                  {supplies.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">{supplies.name}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">{supplies.address}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">{supplies.phone}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {supplies.status === "active" ? (
                    <>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        Hoạt động
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                        Ngừng hoạt động
                      </span>
                    </>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => onEdit(supplies)}
                    >
                      <i className="bx bx-edit text-xl"></i>
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => onDelete(supplies)}
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
      {supplies.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <i className="bx bx-package mb-2 text-5xl"></i>
          <p>Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}
