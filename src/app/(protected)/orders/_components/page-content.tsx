"use client";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMyOrder } from "@/api/order-api";
import { Order } from "@/types/index";
import { PageLoading } from "@/components/page-loading";
import { useMyOrders } from "../hooks/use-orders";
import PaginationList from "@/components/ui/pagination-list";

export default function PageContent() {
  // const { data: { data: orderList = [] } = {}, isLoading } = useQuery({
  //   queryKey: ["my-orders"],
  //   queryFn: getMyOrder,
  // });

  const {
    data: orderList,
    state,
    isLoading,
    totalPages,
    setState,
  } = useMyOrders();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Helper function to get status text in Vietnamese
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

  // Helper function to get payment method text in Vietnamese
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

  // Helper function to get payment status text in Vietnamese
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

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">
            Đơn hàng của tôi
          </h1>

          {isLoading ? (
            <PageLoading />
          ) : orderList.length === 0 ? (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
              <div className="mb-4 text-gray-400">
                <i className="bx bx-package text-6xl"></i>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                Chưa có đơn hàng nào
              </h3>
              <p className="mb-4 text-gray-500">
                Bạn chưa có đơn hàng nào. Hãy mua sắm để khám phá các sản phẩm
                tuyệt vời của chúng tôi.
              </p>
              <Link
                href="/products"
                className="inline-block rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-dark"
              >
                Khám phá sản phẩm
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Mã đơn
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Ngày đặt
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Tổng tiền
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
                    {orderList.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          #{order.orderId}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {new Date(order.createdAt ?? "").toLocaleDateString(
                            "vi-VN",
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {order.total.toLocaleString()}₫
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold leading-5 ${order.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""} ${order.status === "processing" ? "bg-blue-100 text-blue-800" : ""} ${order.status === "shipped" ? "bg-indigo-100 text-indigo-800" : ""} ${order.status === "delivered" ? "bg-green-100 text-green-800" : ""} ${order.status === "cancelled" ? "bg-red-100 text-red-800" : ""} `}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <button
                            onClick={() => handleViewOrderDetails(order)}
                            className="font-medium text-primary hover:text-primary-dark"
                          >
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
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
                        selectedOrder?.createdAt ?? "",
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
                      <tr key={item.productId}>
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

              <div className="mt-6 flex justify-end">
                <button
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  onClick={handleCloseModal}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
  );
}
