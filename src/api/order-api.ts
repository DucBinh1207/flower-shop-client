import { StateOrderQuery } from "src/app/admin/orders/hooks/use-orders";
import { Order, OrderStatus, ResponsePayment } from "../types";
import PublicHttpClient from "./public-http-client";
import { DataResponseWithPagination } from "./type";
import { StateMyOrderQuery } from "@/app/(protected)/orders/hooks/use-orders";

const httpClient = new PublicHttpClient("orders");

export async function getOrders(params: Partial<StateOrderQuery>) {
  const response = await httpClient.get<DataResponseWithPagination<Order[]>>({
    params,
  });

  const data = response.data.data;
  return data;
}

export async function order(data: Order) {
  const response = await httpClient.post<ResponsePayment>({
    data,
  });

  return response.data;
}

export async function getMyOrder(params: Partial<StateMyOrderQuery>) {
  const response = await httpClient.get<DataResponseWithPagination<Order[]>>({
    url: "/user",params
  });

  return response.data.data;
}

export async function updateOrderStatus({
  id,
  status,
}: {
  id: string;
  status: OrderStatus;
  }) {
  const data = {
    status :status
  }
  const response = await httpClient.put<DataResponseWithPagination<Order[]>>({
    url: `/${id}/status`,
    data,
  });

  return response.data.data;
}
