import { User } from "../types";
import PublicHttpClient from "./public-http-client";
import { DataResponseWithPagination } from "./type";
import { StateUserQuery } from "src/app/admin/users/_hooks/use-users";

const httpClient = new PublicHttpClient("users");

export async function getUsers(params: Partial<StateUserQuery>) {
  const response = await httpClient.get<DataResponseWithPagination<User[]>>({
    params,
  });

  return response.data.data;
}

export async function updateStatusUser({
  id,
  data,
}: {
  id: string;
  data: { status: string };
}) {
  const response = await httpClient.put<{ data: User }>({
    data,
    url: `/${id}/status`,
  });

  return response.data.data;
}
