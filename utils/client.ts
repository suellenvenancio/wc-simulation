import axios, { AxiosInstance, AxiosRequestConfig } from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL

class Client {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
  }

  async get(url: string, config?: AxiosRequestConfig) {
    return await this.client.get(url, config)
  }

  async post<T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return (await this.client.post<T>(url, body, config)).data
  }

  async put(url: string, body?: unknown, config?: AxiosRequestConfig) {
    return await this.client.put(url, body, config)
  }

  async delete(url: string, config?: AxiosRequestConfig) {
    return await this.client.delete(url, config)
  }
}

const client = new Client()
export default client
