import { MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import type { DummyProduct } from '../types/dummyJsonApi'
import { DummyProductRowShadcnDeletePopover } from './DummyProductRowShadcnDeletePopover'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface Props {
  data: DummyProduct
}

export const DummyProductRowActionMenu: React.FC<Props> = ({ data }) => {
  const [openPopover, setOpenPopover] = useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white" align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenPopover(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DummyProductRowShadcnDeletePopover
        data={data}
        open={openPopover}
        onClose={() => setOpenPopover(false)}
      />
    </>
  )
}
