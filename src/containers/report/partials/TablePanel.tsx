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
            <StyledTableCell align="left">{`${v.student_lname}.${v.student_fname}`}</StyledTableCell>
            {_.range(1, 17).map((val) => {
              if (
                v.attendance
                  .map((att) => {
                    return att.week
                  })
                  .includes(val)
              )
                return (
                  <StyledTableCell
                    key={val}
                    variant="head"
                    align="center"
                    sx={{
                      bgcolor: v.attendance
                        .map((att) => {
                          return att.week === val ? att.status : ''
                        })
                        .includes(1)
                        ? Colors.present
                        : v.attendance
                            .map((att) => {
                              return att.week === val ? att.status : ''
                            })
                            .includes(0)
                        ? Colors.absent
                        : Colors.others,
                    }}
                  />
                )
              return <StyledTableCell key={val} variant="head" align="center" />
            })}
            {/* <StyledTableCell variant="head" align="center">
              {v.attendance.length}
            </StyledTableCell> */}
          </StyledTableRow>
        ))}
    </>
  )
}

export default TablePanel
