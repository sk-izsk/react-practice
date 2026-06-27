import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { useGetDummyProducts } from '../hooks/web/useGetDummyProducts'
import { DummyProductFilterBarShadcn } from './DummyProductFilterbarShadcn'
import { DummyProductTableShadcn } from './DummyProductTableShadcn'

interface Props {}

export const DummyProductTableShadcnContainer: React.FC<Props> = () => {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || undefined
  const category = searchParams.get('category') || undefined
  const { data } = useGetDummyProducts(category)
  const columns = ['Title', 'Category', 'Stock', 'Price']
  const filteredData = useMemo(() => {
    return data?.products.filter((product) => {
      const matchesSearch = search
        ? product.title.toLowerCase().includes(search.toLowerCase())
        : true
      return matchesSearch
    })
  }, [data?.products, search])

  const totalPrice = useMemo(() => {
    return filteredData?.reduce((acc, product) => acc + product.price * product.stock, 0) || 0
  }, [filteredData])

  return (
    <div className="w-full space-y-4">
      <DummyProductFilterBarShadcn />
      <DummyProductTableShadcn>
        <DummyProductTableShadcn.Header list={columns} />
        <DummyProductTableShadcn.Body data={filteredData || []} />
        {filteredData?.length === 0 && (
          <DummyProductTableShadcn.EmptyPlaceholder noOfColumns={columns.length} />
        )}
        <DummyProductTableShadcn.Footer
          totalItems={filteredData?.length || 0}
          totalPrice={totalPrice}
        />
      </DummyProductTableShadcn>
    </div>
  )
}
