import ky from 'ky'

const DEFAULT_API_URL = 'https://jsonplaceholder.typicode.com'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_URL

export const api = ky.create({
  prefix: API_BASE_URL,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const get = <T>(path: string) => api.get(path).json<T>()

const post = <TResponse, TBody>(path: string, body: TBody) =>
  api.post(path, { json: body }).json<TResponse>()

const put = <TResponse, TBody>(path: string, body: TBody) =>
  api.put(path, { json: body }).json<TResponse>()

const del = <TResponse>(path: string) => api.delete(path).json<TResponse>()

export const jsonPlaceholderApi = {
  get,
  post,
  put,
  delete: del,
}
