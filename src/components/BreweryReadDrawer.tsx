import { Drawer, Space, Typography } from 'antd'
import React from 'react'
import type { Brewery } from '../types/breweryApi'

interface Props {
  data: Brewery
  open: boolean
  onClose: () => void
}

const { Text, Title } = Typography

const InfoRender = ({ label, value }: { label: string; value: string | null }) => {
  return (
    <Space orientation="vertical" style={{ width: '100%' }}>
      <Title level={5}>{label}</Title>
      <Text>{value || 'N/A'}</Text>
    </Space>
  )
}

export const BreweryReadDrawer: React.FC<Props> = ({ data, open, onClose }) => {
  return (
    <Drawer destroyOnHidden open={open} onClose={onClose} title={data.name}>
      <Space size="large" orientation="vertical" style={{ width: '100%' }}>
        <InfoRender label="Name" value={data.name} />
        <InfoRender label="Type" value={data.brewery_type} />
        <InfoRender label="Address" value={data.address_1} />
        <InfoRender
          label="Location"
          value={`${data.city}, ${data.state_province}, ${data.country}`}
        />
        <InfoRender label="Phone" value={data.phone} />
        <InfoRender label="Website" value={data.website_url} />
      </Space>
    </Drawer>
  )
}
