"use client";

import { useState, useEffect } from "react";
import { orders } from "@/constants/orders";
import { products } from "@/constants/products";
import { categories } from "@/constants/categories";
import { users } from "@/constants/users";
import Link from "next/link";

export default function PageContent() {
  const [recentOrders, setRecentOrders] = useState(orders.slice(0, 5));
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    // Calculate dashboard stats
    setStats({
      totalOrders: orders.length,
      totalProducts: products.length,
      totalCategories: categories.length,
      totalUsers: users.filter((user) => user.role === "customer").length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      pendingOrders: orders.filter((order) => order.status === "pending")
        .length,
    });
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tổng quan</h1>
        <p className="text-gray-600">
          Chào mừng trở lại với bảng điều khiển quản trị SeedBloom
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <i className="bx bx-cart text-2xl text-blue-600"></i>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Tổng đơn hàng</h3>
              <p className="text-2xl font-semibold">{stats.totalOrders}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">
              {stats.pendingOrders} đơn hàng đang chờ xử lý
            </span>
            <Link
              href="/admin/orders"
              className="text-sm text-primary hover:underline"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <i className="bx bx-money text-2xl text-green-600"></i>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Doanh thu</h3>
              <p className="text-2xl font-semibold">
                {stats.totalRevenue.toLocaleString()}₫
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Tháng này</span>
            <span className="text-sm text-green-500">
              +12.5% so với tháng trước
            </span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center">
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <i className="bx bx-user text-2xl text-purple-600"></i>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Người dùng</h3>
              <p className="text-2xl font-semibold">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Khách hàng đã đăng ký</span>
            <span className="text-sm text-purple-500">+5 người dùng mới</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm lg:col-span-2">
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Đơn hàng gần đây
              </h2>
              <Link
                href="/admin/orders"
                className="text-sm text-primary hover:underline"
              >
                Xem tất cả
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Mã đơn
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Ngày đặt
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                      #{order.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {order.customerName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {order.total.toLocaleString()}₫
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""} ${order.status === "processing" ? "bg-blue-100 text-blue-800" : ""} ${order.status === "shipped" ? "bg-indigo-100 text-indigo-800" : ""} ${order.status === "delivered" ? "bg-green-100 text-green-800" : ""} ${order.status === "cancelled" ? "bg-red-100 text-red-800" : ""} `}
                      >
                        {order.status === "pending" ? "Chờ xử lý" : ""}
                        {order.status === "processing" ? "Đang xử lý" : ""}
                        {order.status === "shipped" ? "Đang giao" : ""}
                        {order.status === "delivered" ? "Đã giao" : ""}
                        {order.status === "cancelled" ? "Đã hủy" : ""}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-gray-800">
            Thống kê nhanh
          </h2>

          <div className="space-y-4">
            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-sm text-gray-600">Sản phẩm</span>
                <span className="text-sm font-medium">
                  {stats.totalProducts}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-sm text-gray-600">Danh mục</span>
                <span className="text-sm font-medium">
                  {stats.totalCategories}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-sm text-gray-600">
                  Tỷ lệ hoàn thành đơn
                </span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-sm text-gray-600">
                  Đánh giá trung bình
                </span>
                <span className="text-sm font-medium">4.6/5</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-yellow-500"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-sm font-medium text-gray-700">
              Phân bổ sản phẩm theo danh mục
            </h3>
            <div className="space-y-2">
              {categories.slice(0, 5).map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-gray-600">{category.name}</span>
                  <span className="text-sm font-medium">
                    {category.productCount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
