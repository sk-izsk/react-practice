import type { DummyProduct } from '../types/dummyJsonApi'
import { DummyProductRowActionMenu } from './DummyProductRowActionMenu'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

interface RootProps {
  children: React.ReactNode
}

interface ShadcnTableHeaderProps {
  list: (string | React.ReactNode)[]
}
const ShadcnTableHeader: React.FC<ShadcnTableHeaderProps> = ({ list }) => {
  return (
    <TableHeader>
      <TableRow>
        {list.map((item, index) => (
          <TableHead key={typeof item === 'string' ? item : index} className="px-4">
            {item}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}

interface ShadcnTableBodyProps {
  data: DummyProduct[]
}

const ShadcnTableBody: React.FC<ShadcnTableBodyProps> = ({ data }) => {
  return (
    <TableBody>
      {data.map((item) => (
        <TableRow key={item.id}>
          <TableCell className="px-4 whitespace-normal">{item.title}</TableCell>
          <TableCell className="px-4 capitalize">{item.category}</TableCell>
          <TableCell className="px-4">{item.stock}</TableCell>
          <TableCell className="px-4">
            <span>${item.price.toFixed(2)}</span>
            <DummyProductRowActionMenu data={item} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

interface ShadcnTableFooterProps {
  totalItems: number
  totalPrice: number
}

const ShadcnTableFooter: React.FC<ShadcnTableFooterProps> = ({ totalItems, totalPrice }) => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell className="px-4" colSpan={2}>
          Total Items: {totalItems}
        </TableCell>
        <TableCell className="px-4 text-right" colSpan={2}>
          Total Price: ${totalPrice.toFixed(2)}
        </TableCell>
      </TableRow>
    </TableFooter>
  )
}

const DummyProductTableEmptyPlaceholder: React.FC<{ noOfColumns: number }> = ({ noOfColumns }) => {
  return (
    <TableRow>
      <TableCell colSpan={noOfColumns} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  )
}

type DummyProductTableShadcnType = React.FC<RootProps> & {
  Header: typeof ShadcnTableHeader
  Body: typeof ShadcnTableBody
  Footer: typeof ShadcnTableFooter
  EmptyPlaceholder: typeof DummyProductTableEmptyPlaceholder
}

const Root: React.FC<RootProps> = ({ children }) => {
  return <Table className="table-fixed">{children}</Table>
}
export const DummyProductTableShadcn = Object.assign(Root, {
  Header: ShadcnTableHeader,
  Body: ShadcnTableBody,
  Footer: ShadcnTableFooter,
  EmptyPlaceholder: DummyProductTableEmptyPlaceholder,
}) as DummyProductTableShadcnType
