import globalAxios, { AxiosRequestConfig } from "axios";

import BaseHttpClient from "./base-http-client";
import env from "@/configs/env";
import {
  HttpStatusCode,
  HttpStatusCodeType,
} from "@/constants/http-status-code";
import isNil from "@/utils/is-nil";
import isString from "@/utils/is-string";
import isPromise from "@/utils/is-promise";
import { getAuthTokenFromInternalServer } from "./internal-auth-token-api";

const publicAxios = globalAxios.create({
  baseURL: env.API_BASE_URL,

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 60000, // 60 seconds

  // `paramsSerializer` is a config in charge of serializing `params`
  paramsSerializer: {
    // array indexes format (true - leads to brackets with indexes).
    // example: { a: ['b', 'c'] } => 'a[0]=b&a[1]=c'
    indexes: true,
    // override https://github.com/axios/axios/blob/v1.6.8/lib/helpers/buildURL.js#L14
    // need to encode `:`, `$`, `,`, `+`, `[`, and `]`
    encode: encodeURIComponent,
  },

  withCredentials: true,
});

const privateHttpClientHeaderManager = {
  setAuthorization(token: string) {
    publicAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  getAuthorization() {
    return publicAxios.defaults.headers.common.Authorization?.toString();
  },
};

// Define variables for handling unauthorized requests
let waitForAuthTokenToBeFetched: Promise<true> | false = false;

class PublicHttpClient extends BaseHttpClient {
  constructor(resource: string) {
    super({ axios: publicAxios, resource });
  }

  private async processAuthorization() {
    // no authorization
    if (isNil(privateHttpClientHeaderManager.getAuthorization())) {
      if (waitForAuthTokenToBeFetched === false) {
        waitForAuthTokenToBeFetched = new Promise((resolve) => {
          (async () => {
            const authToken = await getAuthTokenFromInternalServer();

            if (isString(authToken)) {
              privateHttpClientHeaderManager.setAuthorization(authToken);
            }

            // always resolve promise
            resolve(true);
          })();
        });
      }

      // ensure that the token is only fetched once, even if multiple requests are made at the same time
      // avoid multiple requests on the first page load
      if (isPromise(waitForAuthTokenToBeFetched)) {
        await waitForAuthTokenToBeFetched;

        waitForAuthTokenToBeFetched = false;
      }
    }
  }

  /**
   * Sends an HTTP request.
   *
   * @param config - The request configuration.
   * @returns The response data and status.
   */
  protected async request<T = unknown>(config: AxiosRequestConfig) {
    await this.processAuthorization();
    return super.request<T>(config);
  }

  /**
   * handle http response error
   *
   * @param error
   * @returns
   */
  protected handleError(error: unknown) {
    const targetError = super.handleError(error);

    // handle axios error
    if (globalAxios.isAxiosError(error)) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response) {
        const reason = error.response.data;

        /**
         * handle http error status code
         */
        switch (error.response.status as HttpStatusCodeType) {
          case HttpStatusCode.SYSTEM_ERROR: {
            // TODO: update later
            break;
          }
          case HttpStatusCode.MAINTENANCE_ERROR: {
            // TODO: update later
            break;
          }
        }

        return reason;
      }
    }

    // unhandled error
    if (error instanceof Error) {
      // TODO: update later
    }

    return targetError;
  }
}

export { publicAxios };
export default PublicHttpClient;
