import type { TableColumnType } from 'antd'
import type { Brewery } from '../../types/breweryApi'

export const useBreweryColumns = (): TableColumnType<Brewery>[] => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'brewery_type',
      key: 'brewery_type',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state_province',
      key: 'state_province',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Website',
      key: 'website_url',
      render: (data: Brewery) => (
        <a
          href={data.website_url || '#'}
          onClick={(e) => {
            if (!data.website_url) {
              e.preventDefault()
            }
          }}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: data.website_url ? '#1890ff' : 'gray',
          }}
        >
          {data.website_url || 'N/A'}
        </a>
      ),
    },
  ]
}
