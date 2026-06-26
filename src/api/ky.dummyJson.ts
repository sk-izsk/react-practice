import { baseApi } from './ky.jsonPlaceHolder'

const DEFAULT_API_URL = 'https://dummyjson.com/'

export const api = baseApi(DEFAULT_API_URL)

const get = <T>(path: string) => api.get(path).json<T>()

const post = <TResponse, TBody>(path: string, body: TBody) =>
  api.post(path, { json: body }).json<TResponse>()

const put = <TResponse, TBody>(path: string, body: TBody) =>
  api.put(path, { json: body }).json<TResponse>()

const patch = <TResponse, TBody>(path: string, body: TBody) =>
  api.patch(path, { json: body }).json<TResponse>()

const del = <TResponse>(path: string) => api.delete(path).json<TResponse>()

export const dummyJsonApi = {
  get,
  post,
  put,
  delete: del,
  patch,
}
