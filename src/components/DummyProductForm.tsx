import { Button, Drawer, Input, InputNumber, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import type { DummyProduct } from '../types/dummyJsonApi'

interface Props {
  data?: Partial<DummyProduct>
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<DummyProduct>) => void
}

const initialState: Partial<DummyProduct> = {
  title: '',
  category: '',
  price: 0,
  stock: 0,
}

export const DummyProductForm: React.FC<Props> = ({ data, isOpen, onClose, onSubmit }) => {
  const isEditMode = Boolean(data?.id)
  const [formData, setFormData] = useState<Partial<DummyProduct>>(data || initialState)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleInputNumberChange = (name: string, value: number | null) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value ?? 0,
    }))
  }

  useEffect(() => {
    setFormData(data ?? initialState)
  }, [data, isOpen])

  return (
    <Drawer
      title={isEditMode ? 'Edit Product' : 'Add Product'}
      destroyOnHidden
      open={isOpen}
      onClose={onClose}
    >
      <Space orientation="vertical" style={{ width: '100%' }} size="large">
        <Input
          value={formData.title}
          onChange={handleInputChange}
          name="title"
          placeholder="Title"
          size="large"
        />
        <Input
          value={formData.category}
          onChange={handleInputChange}
          name="category"
          placeholder="Category"
          size="large"
        />
        <InputNumber
          value={formData.price}
          // onChange={handleInputChange}
          onChange={(value) => handleInputNumberChange('price', value)}
          name="price"
          placeholder="Price"
          type="number"
          size="large"
        />
        <InputNumber
          value={formData.stock}
          // onChange={handleInputChange}
          onChange={(value) => handleInputNumberChange('stock', value)}
          name="stock"
          placeholder="Stock"
          type="number"
          size="large"
        />
        <Space>
          <Button onClick={() => onSubmit?.(formData)} type="primary">
            {isEditMode ? 'Update' : 'Create'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      </Space>
    </Drawer>
  )
}
