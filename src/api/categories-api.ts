import { Category } from "../types";
import PublicHttpClient from "./public-http-client";
import { DataResponseWithPagination } from "./type";

const httpClient = new PublicHttpClient("categories");

type GetCategoriesRequestParams = {
  limit: number;
};

export async function getCategories(params?: GetCategoriesRequestParams) {
  const response = await httpClient.get<DataResponseWithPagination<Category[]>>(
    { params },
  );

  return response.data.data;
}
