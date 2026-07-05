import ky from 'ky'

const DEFAULT_API_URL = 'https://api.openbrewerydb.org/v1/'

const baseApi = ky.create({
  prefix: DEFAULT_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const get = <T>(path: string) => baseApi.get(path).json<T>()

export const breweryApi = {
  get,
}
