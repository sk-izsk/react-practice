import { ApiOutlined } from '@ant-design/icons'
import Layout from 'antd/es/layout'
import Menu, { type MenuProps } from 'antd/es/menu'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router'

interface Props {}

const { Sider } = Layout

const items: MenuProps['items'] = [
  {
    key: '/crud',
    label: <Link to="/crud">CRUD</Link>,
    icon: <ApiOutlined />,
    children: [
      {
        key: '/crud/table',
        label: <Link to="/crud/table">table</Link>,
      },
    ],
  },
  {
    key: '/tanstack',
    label: <Link to="/tanstack">Tanstack</Link>,
    icon: <ApiOutlined />,
    children: [
      {
        key: '/tanstack/virtual',
        label: <Link to="/tanstack/virtual">virtual</Link>,
      },
    ],
  },
  {
    key: '/react-practice',
    label: <Link to="/react-practice">React Practice</Link>,
    icon: <ApiOutlined />,
    children: [
      {
        key: '/react-practice/1',
        label: <Link to="/react-practice/1">React Practice 1</Link>,
      },
      {
        key: '/react-practice/2',
        label: <Link to="/react-practice/2">React Practice 2</Link>,
      },
      {
        key: '/react-practice/3',
        label: <Link to="/react-practice/3">React Practice 3</Link>,
      },
    ],
  },
]

export const SideBar: React.FC<Props> = () => {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value: boolean) => setCollapsed(value)}
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        alignSelf: 'flex-start',
      }}
    >
      <Menu
        // theme="dark"
        selectedKeys={[pathname]}
        // defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
      />
    </Sider>
  )
}
