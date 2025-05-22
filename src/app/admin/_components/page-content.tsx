"use client";

import { useState, useEffect } from "react";
import { orders } from "@/constants/orders";
import { products } from "@/constants/products";
import { categories } from "@/constants/categories";
import { users } from "@/constants/users";
import Link from "next/link";
import {
  getDashboardOverview,
  getDashboardStatistics,
  getRecentOrders,
} from "@/api/dashboard-api";
import { useQuery } from "@tanstack/react-query";

export default function PageContent() {
  const { data } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: getDashboardOverview,
  });

  const { data: recentOrders } = useQuery({
    queryKey: ["recent-orders"],
    queryFn: getRecentOrders,
  });

  const { data: dashboardStatistics } = useQuery({
    queryKey: ["dashboard-statistics"],
    queryFn: getDashboardStatistics,
  });

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    setStats({
      totalOrders: data?.totalOrder || 0,
      totalProducts: products.length,
      totalCategories: categories.length,
      totalUsers: data?.totalUser || 0,
      totalRevenue: data?.totalIncome || 0,
      pendingOrders: data?.totalPendingOrder || 0,
    });
  }, [data]);

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
              <h3 className="text-sm text-gray-500">Tổng Doanh thu</h3>
              <p className="text-2xl font-semibold">
                {stats.totalRevenue.toLocaleString()}₫
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Doanh thú tháng này</span>
            <span className="text-sm text-green-500">
              {data?.currentMonthIncome}₫
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
                {recentOrders && (
                  <>
                    {recentOrders &&
                      recentOrders.map((order) => (
                        <tr
                          key={order.orderId}
                          className="hover:bg-gray-50"
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                            #{order.orderId}
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
                              {order.status === "processing"
                                ? "Đang xử lý"
                                : ""}
                              {order.status === "shipped" ? "Đang giao" : ""}
                              {order.status === "delivered" ? "Đã giao" : ""}
                              {order.status === "cancelled" ? "Đã hủy" : ""}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {new Date(order.createdAt ?? "").toLocaleDateString(
                              "vi-VN",
                            )}
                          </td>
                        </tr>
                      ))}
                  </>
                )}
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
                  {dashboardStatistics?.totalProduct}
                </span>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-sm text-gray-600">Danh mục</span>
                <span className="text-sm font-medium">
                  {dashboardStatistics?.totalCategory}
                </span>
              </div>
            </div>

            <div>
              <div className="mb-1 flex justify-between">
                <span className="text-sm text-gray-600">
                  Tỷ lệ hoàn thành đơn
                </span>
                <span className="text-sm font-medium">
                  {dashboardStatistics?.orderCompletionRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-gray-200 pt-6">
            <h3 className="mb-4 text-sm font-medium text-gray-700">
              Phân bổ sản phẩm theo danh mục
            </h3>
            <div className="space-y-2">
              {dashboardStatistics && (
                <>
                  {dashboardStatistics.productTypePerCategory.map((category,id) => (
                    <div
                      key={id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">
                        {category.category}
                      </span>
                      <span className="text-sm font-medium">
                        {category.count}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
