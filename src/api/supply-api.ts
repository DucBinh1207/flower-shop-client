import { Supplier } from "../types";
import PublicHttpClient from "./public-http-client";
import { DataResponseWithPagination } from "./type";

const httpClient = new PublicHttpClient("suppliers");

export async function getSuppliers() {
  const response = await httpClient.get<DataResponseWithPagination<Supplier[]>>(
    {},
  );

  return response.data.data;
}
