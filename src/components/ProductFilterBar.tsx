import { Flex } from 'antd'
import React from 'react'
import { ProductFilterCategory } from './ProductFilterCategory'
import { ProductFilterInput } from './ProductFilterInput'

interface Props {}

export const ProductFilterBar: React.FC<Props> = () => {
  return (
    <Flex justify="space-between">
      <ProductFilterInput />
      <ProductFilterCategory />
    </Flex>
  )
}
