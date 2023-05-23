import React from 'react'
import {
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  IconButton,
} from '@mui/material'
import Colors from '@theme/colors'
import { FormProps } from '@constants/types'
import { Edit as IconEdit } from '@mui/icons-material'

type Props = {
  attendance: FormProps[] | undefined
  handleChangeStatus: (id: string) => void
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    border: '1px solid black',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: '1px solid black',
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(even)': {
    backgroundColor: Colors.table_grey,
  },
}))

const TablePanel: React.FC<Props> = ({ attendance, handleChangeStatus }) => {
  return (
    <>
      {attendance &&
        attendance.map((v, i) => (
          <StyledTableRow key={i}>
            <StyledTableCell align="left">{v.id}</StyledTableCell>
            <StyledTableCell align="left">{v.fullname}</StyledTableCell>
            <StyledTableCell align="right">
              {v.card_number}
              <IconButton
                sx={{ ml: 6 }}
                onClick={() => handleChangeStatus(v.id)}
              >
                <IconEdit sx={{ fontSize: '16px' }} />
              </IconButton>
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </>
  )
}

export default TablePanel
