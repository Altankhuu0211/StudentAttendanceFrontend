import React from 'react'
import _ from 'lodash'
import { styled, TableCell, tableCellClasses, TableRow } from '@mui/material'
import Colors from '@theme/colors'
import { ReportProps } from '@constants/types'

type Props = {
  reportData: ReportProps[] | undefined
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

const TablePanel: React.FC<Props> = ({ reportData }) => {
  return (
    <>
      {reportData &&
        reportData.map((v, i) => (
          <StyledTableRow key={i}>
            <StyledTableCell align="center">{i + 1}</StyledTableCell>
            <StyledTableCell align="left">{v.student_id}</StyledTableCell>
            <StyledTableCell align="left">{v.fullname}</StyledTableCell>
            {v.attendance.map((att, idx) => {
              return (
                <StyledTableCell
                  key={idx}
                  variant="head"
                  align="center"
                  sx={{
                    bgcolor:
                      att.status == '1'
                        ? Colors.present
                        : att.status == '0'
                        ? 'none'
                        : Colors.others,
                  }}
                />
              )
            })}
            <StyledTableCell variant="head" align="center">
              {v.total_attendance}
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </>
  )
}

export default TablePanel
