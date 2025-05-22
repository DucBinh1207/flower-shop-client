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

export async function createProduct(data: Product) {
  const response = await httpClient.post<{ data: Product }>({
    data,
  });

  return response.data.data;
}

export async function updateProduct({id,data}:{id: string, data: Product}) {
  const response = await httpClient.put<{ data: Product }>({
    data,
    url: `/${id}`,
  });

  return response.data.data;
}

export async function deleteProduct({id}:{id: string}) {
  const response = await httpClient.delete<{ status: string }>({
    url: `/${id}`,
  }); 

  return response.data.status;
}
