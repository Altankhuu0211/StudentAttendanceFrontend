import React from 'react'
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
} from '@mui/material'
import Colors from '@theme/colors'
import { StudentProps } from '@constants/types'
import { ATTENDANCE_STATUS } from '@constants/common'

type Props = {
  attendance: StudentProps[] | undefined
  handleChangeStatus: (e: SelectChangeEvent<string>, id: string) => void
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
            <StyledTableCell align="center">{i + 1}</StyledTableCell>
            <StyledTableCell align="left">{v.student_id}</StyledTableCell>
            <StyledTableCell align="left">{`${v.student_lname}.${v.student_fname}`}</StyledTableCell>
            <StyledTableCell align="center">
              <Select
                value={ATTENDANCE_STATUS[v.status]}
                sx={{
                  '& fieldset': {
                    border: 'none',
                  },
                  color:
                    ATTENDANCE_STATUS[v.status] === 'Ирээгүй'
                      ? Colors.absent
                      : ATTENDANCE_STATUS[v.status] === 'Ирсэн'
                      ? Colors.present
                      : Colors.others,
                }}
                onChange={(e) => handleChangeStatus(e, v.student_id)}
              >
                {ATTENDANCE_STATUS.map((item, i) => {
                  return (
                    <MenuItem value={item} key={i}>
                      {item}
                    </MenuItem>
                  )
                })}
              </Select>
            </StyledTableCell>
            <StyledTableCell align="center">{v.time}</StyledTableCell>
          </StyledTableRow>
        ))}
    </>
  )
}

export default TablePanel
