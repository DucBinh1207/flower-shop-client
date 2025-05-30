"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useOrders } from "../hooks/use-orders";
import PaginationList from "@/components/ui/pagination-list";
import { Order } from "@/types/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "@/api/order-api";
import useDebounceCallback from "@/hooks/use-debounce-callback";

export default function PageContent() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchValue, setSearchValue] = useState("");
  const [openStatusDropdown, setOpenStatusDropdown] = useState<string | null>(
    null,
  );
  const [openModalDropdown, setOpenModalDropdown] = useState(false);

  const { toast } = useToast();

  const { data, state, isLoading, totalPages, setState } = useOrders();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["allOrder"] });
      toast({
        title: "Cập nhật thành công",
        description: `Đã cập nhật trạng thái đơn hàng `,
      });
    },
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleUpdateStatus = (
    orderId: string,
    newStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled",
  ) => {
    mutate({ id: orderId, status: newStatus });
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đang xử lý";
      case "shipped":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "cod":
        return "Thanh toán khi nhận hàng";
      case "bank_transfer":
        return "Chuyển khoản ngân hàng";
      default:
        return method;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ thanh toán";
      case "paid":
        return "Đã thanh toán";
      case "failed":
        return "Thanh toán thất bại";
      default:
        return status;
    }
  };

  const handleSelectFilter = (value: string) => {
    if (value !== "all") setState({ status: value });
    else
      setState({
        status: "",
      });
    setStatusFilter(value);
  };
  const [handleDebounceSearch] = useDebounceCallback(
    () => setState({phone:searchValue}),
    300,
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
        <p className="text-gray-600">Quản lý và theo dõi tất cả đơn hàng</p>
      </div>

      {/* Filter and Search */}
      <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Tìm theo số điện thoại..."
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchValue}
              onChange={(e) => {
                handleDebounceSearch();
                setSearchValue(e.target.value);
              }}
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500">
              <i className="bx bx-search text-xl"></i>
            </div>
          </div>

          <div className="w-full md:w-64">
            <select
              className="w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              value={statusFilter}
              onChange={(e) => handleSelectFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipped">Đang giao</option>
              <option value="delivered">Đã giao</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
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
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Thanh toán
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
              {data.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                    #{order.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span className="font-medium">{order.customerName}</span>
                      <span className="text-xs">{order.customerEmail}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(order.createdAt ?? "").toLocaleDateString(
                      "vi-VN",
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800">
                    {order.total.toLocaleString()}₫
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${order.paymentStatus === "paid" ? "bg-green-100 text-green-800" : ""} ${order.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-800" : ""} ${order.paymentStatus === "failed" ? "bg-red-100 text-red-800" : ""} `}
                    >
                      {getPaymentStatusText(order.paymentStatus)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""} ${order.status === "processing" ? "bg-blue-100 text-blue-800" : ""} ${order.status === "shipped" ? "bg-indigo-100 text-indigo-800" : ""} ${order.status === "delivered" ? "bg-green-100 text-green-800" : ""} ${order.status === "cancelled" ? "bg-red-100 text-red-800" : ""} `}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleViewOrder(order)}
                      >
                        <i
                          className="bx bx-show text-xl"
                          title="Xem chi tiết"
                        ></i>
                      </button>
                      <div className="relative">
                        <button
                          className="text-primary hover:text-primary-dark"
                          onClick={() =>
                            setOpenStatusDropdown(
                              openStatusDropdown === order.id ? null : order.id,
                            )
                          }
                        >
                          <i
                            className="bx bx-edit text-xl"
                            title="Cập nhật trạng thái"
                          ></i>
                        </button>
                        {openStatusDropdown === order.id && (
                          <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                            <button
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleUpdateStatus(order.id, "pending");
                                setOpenStatusDropdown(null);
                              }}
                            >
                              Chờ xử lý
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleUpdateStatus(order.id, "processing");
                                setOpenStatusDropdown(null);
                              }}
                            >
                              Đang xử lý
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleUpdateStatus(order.id, "shipped");
                                setOpenStatusDropdown(null);
                              }}
                            >
                              Đang giao
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleUpdateStatus(order.id, "delivered");
                                setOpenStatusDropdown(null);
                              }}
                            >
                              Đã giao
                            </button>
                            <button
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                handleUpdateStatus(order.id, "cancelled");
                                setOpenStatusDropdown(null);
                              }}
                            >
                              Đã hủy
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {data.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <i className="bx bx-package mb-2 text-5xl"></i>
            <p>Không tìm thấy đơn hàng nào</p>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-2">
          <PaginationList
            totalPage={totalPages}
            currentPage={state.page}
            onChangePage={(page) =>
              setState({
                page,
              })
            }
          />
        </div>
      </div>

      {/* Order Detail Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-lg">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Chi tiết đơn hàng #{selectedOrder.id}
                </h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleCloseModal}
                >
                  <i className="bx bx-x text-2xl"></i>
                </button>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-md mb-2 font-semibold text-gray-700">
                    Thông tin khách hàng
                  </h3>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm">
                      <span className="font-medium">Tên:</span>{" "}
                      {selectedOrder.customerName}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Email:</span>{" "}
                      {selectedOrder.customerEmail}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Số điện thoại:</span>{" "}
                      {selectedOrder.customerPhone}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Địa chỉ:</span>{" "}
                      {selectedOrder.shippingAddress}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-md mb-2 font-semibold text-gray-700">
                    Thông tin đơn hàng
                  </h3>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-sm">
                      <span className="font-medium">Ngày đặt:</span>{" "}
                      {new Date(
                        selectedOrder.createdAt ?? "",
                      ).toLocaleDateString("vi-VN")}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Trạng thái:</span>
                      <span
                        className={`ml-1 rounded-full px-2 py-0.5 text-xs font-medium ${selectedOrder.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""} ${selectedOrder.status === "processing" ? "bg-blue-100 text-blue-800" : ""} ${selectedOrder.status === "shipped" ? "bg-indigo-100 text-indigo-800" : ""} ${selectedOrder.status === "delivered" ? "bg-green-100 text-green-800" : ""} ${selectedOrder.status === "cancelled" ? "bg-red-100 text-red-800" : ""} `}
                      >
                        {getStatusText(selectedOrder.status)}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">
                        Phương thức thanh toán:
                      </span>{" "}
                      {getPaymentMethodText(selectedOrder.paymentMethod)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">
                        Trạng thái thanh toán:
                      </span>
                      <span
                        className={`ml-1 rounded-full px-2 py-0.5 text-xs font-medium ${selectedOrder.paymentStatus === "paid" ? "bg-green-100 text-green-800" : ""} ${selectedOrder.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-800" : ""} ${selectedOrder.paymentStatus === "failed" ? "bg-red-100 text-red-800" : ""} `}
                      >
                        {getPaymentStatusText(selectedOrder.paymentStatus)}
                      </span>
                    </p>
                    {selectedOrder.notes && (
                      <p className="text-sm">
                        <span className="font-medium">Ghi chú:</span>{" "}
                        {selectedOrder.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <h3 className="text-md mb-3 font-semibold text-gray-700">
                Sản phẩm đã đặt
              </h3>
              <div className="mb-6 overflow-hidden rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Giá
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Số lượng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {selectedOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div className="mr-3 h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded object-cover"
                                src={item.productImage}
                                alt={item.productName}
                              />
                            </div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.productName}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.price.toLocaleString()}₫
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.subtotal.toLocaleString()}₫
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">
                    {selectedOrder.subtotal.toLocaleString()}₫
                  </span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium">
                    {selectedOrder.shippingFee.toLocaleString()}₫
                  </span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="mb-2 flex justify-between">
                    <span className="text-gray-600">Giảm giá:</span>
                    <span className="font-medium">
                      -{selectedOrder.discount.toLocaleString()}₫
                    </span>
                  </div>
                )}
                <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">
                    {selectedOrder.total.toLocaleString()}₫
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={handleCloseModal}
                >
                  Đóng
                </button>
                <div className="relative">
                  <button
                    className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
                    onClick={() => setOpenModalDropdown(!openModalDropdown)}
                  >
                    Cập nhật trạng thái{" "}
                    <i className="bx bx-chevron-down ml-1"></i>
                  </button>
                  {openModalDropdown && (
                    <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          handleUpdateStatus(selectedOrder.id, "pending");
                          setOpenModalDropdown(false);
                        }}
                      >
                        Chờ xử lý
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          handleUpdateStatus(selectedOrder.id, "processing");
                          setOpenModalDropdown(false);
                        }}
                      >
                        Đang xử lý
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          handleUpdateStatus(selectedOrder.id, "shipped");
                          setOpenModalDropdown(false);
                        }}
                      >
                        Đang giao
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          handleUpdateStatus(selectedOrder.id, "delivered");
                          setOpenModalDropdown(false);
                        }}
                      >
                        Đã giao
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          handleUpdateStatus(selectedOrder.id, "cancelled");
                          setOpenModalDropdown(false);
                        }}
                      >
                        Đã hủy
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
