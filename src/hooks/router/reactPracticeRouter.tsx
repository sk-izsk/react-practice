import { lazy } from 'react'
import { Navigate } from 'react-router'

const ReactPracticeScreen = lazy(() => import('../../screens/ReactPractice/ReactPracticeScreen'))
const ReactPractice1Screen = lazy(() => import('../../screens/ReactPractice/ReactPractice1Screen'))
const ReactPractice2Screen = lazy(() => import('../../screens/ReactPractice/ReactPractice2Screen'))
const ReactPractice3Screen = lazy(() => import('../../screens/ReactPractice/ReactPractice3Screen'))
const ReactPractice4Screen = lazy(() => import('../../screens/ReactPractice/ReactPractice4Screen'))
const ReactPractice5Screen = lazy(() => import('../../screens/ReactPractice/ReactPractice5Screen'))

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
        {
          path: '2',
          element: <ReactPractice2Screen />,
        },
        {
          path: '3',
          element: <ReactPractice3Screen />,
        },
        {
          path: '4',
          element: <ReactPractice4Screen />,
        },
        {
          path: '5',
          element: <ReactPractice5Screen />,
        },
      ],
    },
  ]
}
