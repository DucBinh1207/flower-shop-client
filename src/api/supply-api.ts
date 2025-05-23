import { StateSupplyQuery } from "src/app/admin/supplies/_hooks/use-supplies";
import { Supplier } from "../types";
import PublicHttpClient from "./public-http-client";
import { DataResponseWithPagination } from "./type";

const httpClient = new PublicHttpClient("suppliers");

export async function getSuppliers(params: Partial<StateSupplyQuery>) {
  const response = await httpClient.get<DataResponseWithPagination<Supplier[]>>(
    {params},
  );

  return response.data.data;
}

export async function createSupply(data: Supplier) {
  const response = await httpClient.post<{ data: Supplier }>({
    data,
  });

  return response.data.data;
}

export async function updateSupply({id,data}:{id: string, data: Supplier}) {
  const response = await httpClient.put<{ data: Supplier }>({
    data,
    url: `/${id}`,
  });

  return response.data.data;
}

export async function deleteSupply({id}:{id: string}) {
  const response = await httpClient.delete<{ status: string }>({
    url: `/${id}`,
  }); 

  return response.data.status;
}

