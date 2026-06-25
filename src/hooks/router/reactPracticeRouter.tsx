import { lazy } from 'react'
import { Navigate } from 'react-router'

const ReactPracticeScreen = lazy(() => import('../../screens/ReactPractice/ReactPracticeScreen'))
const ReactPractice1Screen = lazy(() => import('../../screens/ReactPractice/ReactPractice1Screen'))

export const reactPracticeRouter = () => {
  return [
    {
      index: true,
      element: <Navigate to="/react-practice" replace />,
    },
    {
      path: 'react-practice',
      element: <ReactPracticeScreen />,
      children: [
        {
          path: '1',
          element: <ReactPractice1Screen />,
        },
      ],
    },
  ]
}
