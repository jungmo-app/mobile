import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiResponse<T = undefined> {
  data: T;
  /** 메시지 (example: SUCCESS) */
  message: string;
  /** HTTP 상태코드 (example: 200) */
  code: string;
  /** HTTP 상태 (example: OK) */
  status: number;
}

export function createTypedAxios(instance: AxiosInstance) {
  return {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
      const res: AxiosResponse<ApiResponse<T>> = await instance.get(url, config);
      return res.data;
    },
    post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
      const res: AxiosResponse<ApiResponse<T>> = await instance.post(url, data, config);
      return res.data;
    },
    put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
      const res: AxiosResponse<ApiResponse<T>> = await instance.put(url, data, config);
      return res.data;
    },
    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
      const res: AxiosResponse<ApiResponse<T>> = await instance.delete(url, config);
      return res.data;
    },
  };
}
