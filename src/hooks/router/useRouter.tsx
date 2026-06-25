import { type RouteObject } from 'react-router'
import { AppLayout } from '../../AppLayout'
import { crudRouter } from './crudRouter'
import { reactPracticeRouter } from './reactPracticeRouter'
import { tanstackRouter } from './tanstackRouter'

export const useRouter = (): RouteObject[] => [
  {
    path: '/',
    element: <AppLayout />,
    children: [...crudRouter(), ...tanstackRouter(), ...reactPracticeRouter()],
  },
]
