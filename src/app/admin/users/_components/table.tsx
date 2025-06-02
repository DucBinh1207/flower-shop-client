import React, { useState } from "react";
import { User } from "@/types/index";

interface UserTableProps {
  users: User[];
  handleViewUser: (user: User) => void;
  handleUpdateStatus: (user: User, status: "active" | "inactive") => void;
  setStatusUser: (status: "active" | "inactive") => void;
}

export default function UserTable({
  users,
  handleViewUser,
  handleUpdateStatus,
  setStatusUser,
}: UserTableProps) {
  const [openStatusDropdown, setOpenStatusDropdown] = useState<string | null>(
    null,
  );

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
                Avatar  
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Tên người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Số điện thoại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Vai trò
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
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                  {user.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="h-12 w-12 overflow-hidden rounded-md">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">{user.name}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.phone}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  {user.role === "admin" ? (
                    <>
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-green-800">
                        Quản trị viên
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-red-800">
                        Khách hàng
                      </span>
                    </>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  {user.status === "active" ? (
                    <>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        Hoạt động
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                        Đã khóa
                      </span>
                    </>
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleViewUser(user)}
                    >
                      <i
                        className="bx bx-show text-xl"
                        title="Xem chi tiết"
                      ></i>
                    </button>
                    {user.role === "customer" && (
                      <div className="relative">
                        {user.status === "active" ? (
                          <button
                            className="text-primary hover:text-primary-dark"
                            onClick={() => {
                              {
                                handleUpdateStatus(user, "inactive");
                                setStatusUser("inactive");
                              }
                            }}
                          >
                            <i
                              className="bx bx-lock text-xl text-red-400"
                              title="Khóa người dùng"
                            ></i>
                          </button>
                        ) : (
                          <button
                            className="text-primary hover:text-primary-dark"
                            onClick={() => {
                              {
                                handleUpdateStatus(user, "active");
                                setStatusUser("active");
                              }
                            }}
                          >
                            <i
                              className="bx bx-key text-xl text-green-400"
                              title="Mở khóa người dùng"
                            ></i>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {users.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <i className="bx bx-package mb-2 text-5xl"></i>
          <p>Không tìm thấy người dùng nào</p>
        </div>
      )}
    </div>
  );
}
