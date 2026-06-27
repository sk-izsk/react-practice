import React from 'react'
import { useDeleteDummyProduct } from '../hooks/web/useDeleteDummyProduct'
import type { DummyProduct } from '../types/dummyJsonApi'
import { Button } from './ui/button'

interface Props {
  data: DummyProduct
  onClose?: () => void
  open?: boolean
}

export const DummyProductRowShadcnDeletePopover: React.FC<Props> = ({ data, onClose, open }) => {
  const { mutate } = useDeleteDummyProduct()

  const handleDelete = () => {
    mutate(
      { id: data.id },
      {
        onSuccess: () => {
          if (onClose) {
            onClose()
          }
        },
      },
    )
  }

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="text-base font-medium">Delete Item</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Are you sure you want to delete {data.title}?
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}
