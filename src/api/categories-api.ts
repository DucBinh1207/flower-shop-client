import { StateCategoryQuery } from "src/app/admin/categories/_hooks/use-categories";
import { Category } from "../types";
import PublicHttpClient from "./public-http-client";
import { DataResponseWithPagination } from "./type";

const httpClient = new PublicHttpClient("categories");

export async function getCategories(params: Partial<StateCategoryQuery>) {
  const response = await httpClient.get<DataResponseWithPagination<Category[]>>(
    { params },
  );

  return response.data.data;
}

export async function createCategory(data: Category) {
  const response = await httpClient.post<{ data: Category }>({
    data,
  });

  return response.data.data;
}

export async function updateCategory({id,data}:{id: string, data: Category}) {
  const response = await httpClient.put<{ data: Category }>({
    data,
    url: `/${id}`,
  });

  return response.data.data;
}

export async function deleteCategory({id}:{id: string}) {
  const response = await httpClient.delete<{ status: string }>({
    url: `/${id}`,
  }); 

  return response.data.status;
}

