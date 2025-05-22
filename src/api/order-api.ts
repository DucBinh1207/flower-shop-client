import { StateOrderQuery } from "src/app/admin/orders/hooks/use-orders";
import { Order, ResponsePayment } from "../types";
import PublicHttpClient from "./public-http-client";
import { DataResponseWithPagination } from "./type";

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

export async function getMyOrder() {
  const response = await httpClient.get<DataResponseWithPagination<Order[]>>({
    url: "/user",
  });

  return response.data.data;
}
