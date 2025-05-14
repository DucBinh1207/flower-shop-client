import { Order, User } from "../types";
import PublicHttpClient from "./public-http-client";
import { DataResponse } from "./type";

const httpClient = new PublicHttpClient("auth");

type LoginRequestData = {
  email: string;
  password: string;
};

type LoginResponseData = {
  tokens: {
    accessToken: string;
  };
  user: User;
};

export async function login(data: LoginRequestData) {
  const response = await httpClient.post<DataResponse<LoginResponseData>>({
    data,
    url: "/login",
  });

  return response.data.data;
}

type RegisterRequestBody = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
};

export async function register(data: RegisterRequestBody) {
  const response = await httpClient.post<DataResponse<Order[]>>({
    data,
    url: "/register",
  });

  return response.data.data;
}

export async function getProfile() {
  const response = await httpClient.get<
    DataResponse<{
      user: User;
    }>
  >({
    url: "/profile",
  });

  return response.data.data;
}

export async function updateMyProfile(data: Partial<User>) {
  const response = await httpClient.put<
    DataResponse<{
      user: User;
    }>
  >({
    url: "/profile",
    data
  });

  return response.data.data;
}


type UpdatePasswordRequestBody = {
  currentPassword:string,
  newPassword: string
};

export async function updateMyPassword(data: UpdatePasswordRequestBody) {
  await httpClient.put({
    url: "/password",
    data
  });
}
