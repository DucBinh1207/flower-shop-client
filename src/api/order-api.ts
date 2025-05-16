import { Order, ResponsePayment } from "../types";
import PublicHttpClient from "./public-http-client";
import { DataResponseWithPagination } from "./type";

const httpClient = new PublicHttpClient("orders");

export async function getOrders() {
  const response = await httpClient.get<DataResponseWithPagination<Order[]>>(
    {},
  );

  return response.data.data;
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
