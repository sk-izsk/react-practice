import { Button, Drawer, Input, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import type { Comment } from '../types/jsonPlaceHolder'

interface Props {
  data?: Comment
  onSubmit: (data: Comment) => void
  onClose: () => void
  isOpen: boolean
  isLoading?: boolean
}

const initialValues: Comment = {
  name: '',
  email: '',
  body: '',
}

export const CommentDrawer: React.FC<Props> = ({ data, onSubmit, onClose, isOpen, isLoading }) => {
  const [formData, setFormData] = useState<Comment>(data ?? initialValues)
  const isEditMode = Boolean(data?.postId)

  useEffect(() => {
    if (!isOpen) {
      setFormData(data ?? initialValues)
      return
    }

    setFormData(data ?? initialValues)
  }, [data, isOpen])

  const handleData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  return (
    <Drawer
      title={isEditMode ? 'Edit Comment' : 'Add Comment'}
      open={isOpen}
      destroyOnHidden
      onClose={onClose}
    >
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <Input name="name" placeholder="Name" value={formData.name} onChange={handleData} />
        <Input name="email" placeholder="Email" value={formData.email} onChange={handleData} />
        <Input.TextArea
          name="body"
          placeholder="Comment"
          value={formData.body}
          onChange={handleData}
        />

        <Space orientation="horizontal" size="large">
          <Button loading={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" onClick={() => onSubmit(formData)} loading={isLoading}>
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </Space>
      </Space>
    </Drawer>
  )
}
