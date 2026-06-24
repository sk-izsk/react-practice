import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router'

const TanstackScreen = lazy(() => import('../../screens/Tanstack/TanstackScreen'))
const TanstackVirtualScreen = lazy(() => import('../../screens/Tanstack/TanstackVirtualScreen'))

export const tanstackRouter = (): RouteObject[] => {
  return [
    {
      index: true,
      element: <Navigate to="/tanstack" replace />,
    },
    {
      path: 'tanstack',
      element: <TanstackScreen />,
      children: [
        {
          path: 'virtual',
          element: <TanstackVirtualScreen />,
        },
      ],
    },
  ]
}
