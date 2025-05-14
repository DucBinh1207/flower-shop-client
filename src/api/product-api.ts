import { StateProductQuery } from "src/app/(public)/products/_hooks/use-products";
import { Product } from "../types";
import PublicHttpClient from "./public-http-client";
import { DataResponseWithPagination } from "./type";

const httpClient = new PublicHttpClient("products");

export async function getProducts(params: Partial<StateProductQuery>) {
  const response = await httpClient.get<DataResponseWithPagination<Product[]>>({
    params,
  });

  return response.data.data;
}
