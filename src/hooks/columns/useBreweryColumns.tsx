import type { TableColumnType } from 'antd'
import { useSearchParams } from 'react-router'
import type { Brewery } from '../../types/breweryApi'

interface BreweryColumnProps {
  setSelectedBrewery: (brewery: Brewery | null) => void
}

export const useBreweryColumns = ({
  setSelectedBrewery,
}: BreweryColumnProps): TableColumnType<Brewery>[] => {
  const [searchParams] = useSearchParams()
  const nameSortOrder = searchParams.get('sort') === 'name' ? searchParams.get('order') : null
  const stateSortOrder =
    searchParams.get('sort') === 'state_province' ? searchParams.get('order') : null

  return [
    {
      title: 'Name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: nameSortOrder as 'ascend' | 'descend' | null,
      render: (data: Brewery) => (
        <>
          <div
            style={{ cursor: 'pointer', color: '#1890ff' }}
            onClick={() => setSelectedBrewery(data)}
          >
            {data.name}
          </div>
        </>
      ),
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
      sorter: (a, b) => a.state_province.localeCompare(b.state_province),
      sortOrder: stateSortOrder as 'ascend' | 'descend' | null,
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
