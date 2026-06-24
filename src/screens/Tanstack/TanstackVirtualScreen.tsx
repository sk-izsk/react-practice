import { Tabs, type TabsProps } from 'antd'
import React from 'react'
import { TanstackNormalTab } from '../../components/TanstackNormalTab'
import { TanstackVirtualTab } from '../../components/TanstackVirtualTab'
import { TanstackVirtualManualTab } from '../../components/TanstackVirtualTabManual'
import { VirtuosoTab } from '../../components/VirtuosoTab'

interface Props {}

const TanstackVirtualScreen: React.FC<Props> = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Virtual',
      children: <TanstackVirtualTab />,
    },
    {
      key: '2',
      label: 'Virtual Manual',
      children: <TanstackVirtualManualTab />,
    },
    {
      key: '3',
      label: 'Virtuoso',
      children: <VirtuosoTab />,
    },
    {
      key: '4',
      label: 'Normal',
      children: <TanstackNormalTab />,
    },
  ]
  return <Tabs defaultActiveKey="1" items={items} />
}

export default TanstackVirtualScreen
