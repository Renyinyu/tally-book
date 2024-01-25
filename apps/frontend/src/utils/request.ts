import axios from 'axios';

import type  { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const DEFAULT_TIME_OUT = 10 * 1000
class Request {
  public instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://jsonplaceholder.typicode.com',
      timeout: DEFAULT_TIME_OUT
    });
  }

  async request<T, U = IResponse<T>>(config: AxiosRequestConfig): Promise<U> {
    try {
      const result: AxiosResponse<U> = await this.instance.request(config)
      return result.data
    } catch (error) {
      console.log(error)
      return Promise.reject(error)      
    }
  }

  async get<T>(url: string, params = {}, config: AxiosRequestConfig = {}){
    return this.request<T>({ url, params, ...config, method: 'GET' })
  }

  async post<T>(url: string, body = {}, config: AxiosRequestConfig = {}){
    return this.request<T>({ url, data: body, ...config, method: 'POST' })
  }
}

const request = new Request();

export default request;

