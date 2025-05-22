import {  ResponseDashboardOverview, ResponseDashboardStatistics, ResponseRecentOrders } from "../types";
import PublicHttpClient from "./public-http-client";

const httpClient = new PublicHttpClient("dashboard");

export async function getDashboardOverview() {
  const response = await httpClient.get<ResponseDashboardOverview>({
    url: "/overview",
  });

  return response.data.data;
}

export async function getRecentOrders() {
  const response = await httpClient.get<ResponseRecentOrders>({
    url: "/recent-orders",
  });

  
  return response.data.orders;
}

export async function getDashboardStatistics() {
  const response = await httpClient.get<ResponseDashboardStatistics>({
    url: "/statistics ",
  });

  return response.data;

}