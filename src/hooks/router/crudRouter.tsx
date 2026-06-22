import { lazy } from 'react'
import { Navigate, type RouteObject } from 'react-router'

const CrudScreen = lazy(() => import('../../screens/Crud/CrudScreen'))
const CrudTableScreen = lazy(() => import('../../screens/Crud/CrudTableScreen'))

export const crudRouter = (): RouteObject[] => {
  return [
    {
      index: true,
      element: <Navigate to="/crud" replace />,
    },
    {
      path: 'crud',
      element: <CrudScreen />,
      children: [
        {
          path: 'table',
          element: <CrudTableScreen />,
        },
      ],
    },
  ]
}
