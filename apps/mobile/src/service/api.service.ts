import axios, { AxiosResponse } from 'axios'

const app = axios.create({
  baseURL: 'http://192.168.0.157:3333/',
  withCredentials: true,
})

export class ApiService {
  url: string

  constructor(url: string) {
    this.url = url
  }

  static assignAccessToken(token: string) {
    app.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  post(data: any, url?: string): Promise<AxiosResponse> {
    return app.post(`${this.url}${url}`, data)
  }

  get(url: string): Promise<AxiosResponse> {
    return app.get(`${this.url}${url}`)
  }

  put(url: string, data: any): Promise<AxiosResponse> {
    return app.put(`${this.url}${url}`, data)
  }

  delete(url: string): Promise<AxiosResponse> {
    return app.delete(`${this.url}${url}`)
  }
}
