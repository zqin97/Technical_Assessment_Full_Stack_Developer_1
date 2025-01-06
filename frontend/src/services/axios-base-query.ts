import type { BaseQueryApi, BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import axios from "./axios";
import Axios from "axios";
import { API } from "@/types/api";

export interface AxiosBaseQueryArgs<Meta, Response = API.BaseResponse> {
  meta?: Meta;
  prepareHeaders?: (
    headers: AxiosRequestHeaders,
    api: BaseQueryApi
  ) => AxiosRequestHeaders;
  transformResponse?: (response: Response) => unknown;
}

export interface ServiceExtraOptions {
  authRequired?: boolean;
}

const getRequestConfig = (args: string | AxiosRequestConfig) => {
  if (typeof args === "string") {
    return { url: args };
  }

  return args;
};

const axiosBaseQuery = <
  Args extends AxiosRequestConfig | string = AxiosRequestConfig,
  Result = unknown,
  DefinitionExtraOptions extends ServiceExtraOptions = Record<string, unknown>,
  Meta = Record<string, unknown>,
>({
  prepareHeaders,
  meta,
  transformResponse,
}: AxiosBaseQueryArgs<Meta> = {}): BaseQueryFn<
  Args,
  Result,
  API.ErrorResponse,
  DefinitionExtraOptions,
  Meta
> => {
  return async (args, api, extraOptions) => {
    try {
      const requestConfig = getRequestConfig(args);
      const result = await axios({
        ...requestConfig,
        headers: prepareHeaders
          ? prepareHeaders(
              (requestConfig.headers as AxiosRequestHeaders) || {},
              api
            )
          : requestConfig.headers,
        signal: api.signal,
        ...extraOptions,
      });

      return {
        data: transformResponse ? transformResponse(result.data) : result.data,
        meta,
      };
    } catch (err) {
      if (!Axios.isAxiosError(err)) {
        return {
          error: {
            code: 500,
            message: (err as Error).message,
          } as API.ErrorResponse,
          meta,
        };
      }
      console.log(err.response?.data);
      const customError: API.ErrorResponse = {
        code: err.response?.status || 500,
        message: err.response?.data?.message || err.message,
        title: err.response?.data?.title,
        app_error_code: err.response?.data?.appErrorCode,
        errors: err.response?.data?.errors,
      };

      return {
        error: customError,
        meta,
      };
    }
  };
};

export default axiosBaseQuery;
