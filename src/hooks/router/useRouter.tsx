import { type RouteObject } from 'react-router'
import { AppLayout } from '../../AppLayout'
import { crudRouter } from './crudRouter'

export const useRouter = (): RouteObject[] => [
  {
    path: '/',
    element: <AppLayout />,
    children: [...crudRouter()],
  },
]
