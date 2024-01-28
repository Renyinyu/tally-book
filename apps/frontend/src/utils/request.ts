import axios, { AxiosError } from 'axios';
import { showToast } from 'vant';

import type  { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ERROR_CODE } from '@/utils/constants'

const DEFAULT_TIME_OUT = 10 * 1000

function handleError(errorCode: ERROR_CODE) {
  switch (errorCode) {
    case ERROR_CODE.SUCCESS:
      return true;
    case ERROR_CODE.PARAMS:
      showToast('参数错误');
      return false
    case ERROR_CODE.TOKEN_EXPIRED:
      showToast('token过期');
      return false
    case ERROR_CODE.NOT_FOUND:
      showToast('404');
      return false;
      default:
      return false
  }
}

class Request {
  public instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      // baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: DEFAULT_TIME_OUT
    });

    this.registerResponseInterceptor();
  }

  private registerResponseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: unknown) => {
        if (error instanceof AxiosError) {
          showToast(error.message)
        }
        return Promise.reject(error);
      }
    );
  }

  async request<T, U extends IResponse<T>>(config: AxiosRequestConfig) {
    const result: AxiosResponse<U> = await this.instance.request(config)
    const data = result.data
    const flag = handleError(data.code)
    if (flag) {
      return data
    } else {
      return Promise.reject(data)
    }
  }

  async get<T>(url: string, params = {}, config: AxiosRequestConfig = {}){
    return this.request<T, IResponse<T>>({ url, params, ...config, method: 'GET' })
  }

  async post<T>(url: string, body = {}, config: AxiosRequestConfig = {}){
    return this.request<T, IResponse<T>>({ url, data: body, ...config, method: 'POST' })
  }
}

const request = new Request();

export default request;

