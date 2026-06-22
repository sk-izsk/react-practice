import Layout from 'antd/es/layout'
import { Outlet } from 'react-router'
import { SideBar } from './components/SideBar'

const { Content } = Layout

export const AppLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />

      <Content style={{ padding: 24 }}>
        <Outlet />
      </Content>
    </Layout>
  )
}
