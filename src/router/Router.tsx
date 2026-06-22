import { BrowserRouter, useRoutes } from 'react-router'
import { useRouter } from '../hooks/router/useRouter'

const AppRouter = () => useRoutes(useRouter())

export const BrowserRouterWrapper = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}
