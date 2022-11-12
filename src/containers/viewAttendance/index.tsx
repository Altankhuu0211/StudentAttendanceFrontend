import React, { useState } from 'react'
import _ from 'lodash'

import moment from 'moment'

// components
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import { ATTENDANCE_STATUS } from '@constants/common'

// constants

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
    backgroundColor: '#EEEEF7',
  },
}))

type Props = {}

const ViewAttendanceContainer: React.FC<Props> = () => {
  const [selectSubject, setSelectSubject] = useState('none')
  const [selectLecture, setSelectLecture] = useState('none')
  const [selectSeminar, setSelectSeminar] = useState('none')
  const [selectLaboratory, setSelectLaboratory] = useState('none')
  const [selectAssignment, setSelectAssignment] = useState('none')

  const handleSelectSubject = (event: SelectChangeEvent) => {
    setSelectSubject(event.target.value)
  }

  const handleSelectLecture = (event: SelectChangeEvent) => {
    setSelectLecture(event.target.value)
  }

  const handleSelectSeminar = (event: SelectChangeEvent) => {
    setSelectSeminar(event.target.value)
  }

  const handleSelectLaboratory = (event: SelectChangeEvent) => {
    setSelectLaboratory(event.target.value)
  }

  const handleSelectAssignment = (event: SelectChangeEvent) => {
    setSelectAssignment(event.target.value)
  }

  const handleChangeStatus = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    console.log(event.target.value, index)
  }

  const renderDate = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#305497',
          color: 'white',
          border: '1px solid black',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {moment().format('ll')}
          </Typography>
          <Typography variant="body2">
            Хичээлийн 7 дугаар долоо хоног
          </Typography>
        </Box>
      </Box>
    )
  }

  const renderFilterPanel = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          p: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
          borderTop: '1px solid black',
          borderRight: '1px solid black',
          borderLeft: '1px solid black',
        }}
      >
        <Select
          value={selectSubject}
          onChange={handleSelectSubject}
          fullWidth
          sx={{ mr: 1.5 }}
        >
          <MenuItem value="none" disabled>
            {'Хичээл сонгоно уу'}
          </MenuItem>
          <MenuItem value="F.IT20">{'F.IT202 Веб зохиомж'}</MenuItem>
        </Select>
        <Select
          value={selectLecture}
          onChange={handleSelectLecture}
          fullWidth
          sx={{ mr: 1.5 }}
        >
          <MenuItem value="none" disabled>
            {'Лекцийн цагаа сонгоно уу'}
          </MenuItem>
          <MenuItem value="mon-2">{'Даваа-2'}</MenuItem>
        </Select>
        <Select
          value={selectSeminar}
          onChange={handleSelectSeminar}
          fullWidth
          sx={{ mr: 1.5 }}
        >
          <MenuItem value="none" disabled>
            {'Семинарын цагаа сонгоно уу'}
          </MenuItem>
          <MenuItem value="mon-2">{'Даваа-2'}</MenuItem>
        </Select>
        <Select
          value={selectLaboratory}
          onChange={handleSelectLaboratory}
          fullWidth
          sx={{ mr: 1.5 }}
        >
          <MenuItem value="none" disabled>
            {'Лабораторын цагаа сонгоно уу'}
          </MenuItem>
          <MenuItem value="mon-2">{'Даваа-2'}</MenuItem>
        </Select>
        <Select
          value={selectAssignment}
          onChange={handleSelectAssignment}
          fullWidth
        >
          <MenuItem value="none" disabled>
            {'Бие даалтын цагаа сонгоно уу'}
          </MenuItem>
          <MenuItem value="mon-2">{'Даваа-2'}</MenuItem>
        </Select>
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
        }}
      >
        {renderDate()}
        {renderFilterPanel()}
        <TableContainer component={Paper}>
          <Table aria-label="caption table" sx={{ width: '100%' }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell
                  variant="head"
                  align="center"
                  sx={{ width: 150 }}
                >
                  Оюутны код
                </StyledTableCell>
                <StyledTableCell variant="head" align="center">
                  Оюутны нэр
                </StyledTableCell>
                {_.range(1, 17).map((val, id) => {
                  return (
                    <StyledTableCell key={id} variant="head" align="center">
                      {val}
                    </StyledTableCell>
                  )
                })}
                <StyledTableCell variant="head" align="center">
                  Нийт ирц
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {response?.data?.map((v, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell align="center">
                    {v.student_id}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {v.student_name}
                  </StyledTableCell>
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
                              ? 'green'
                              : v.attendance
                                  .map((att) => {
                                    return att.week === val ? att.status : ''
                                  })
                                  .includes(0)
                              ? 'red'
                              : 'cyan',
                          }}
                        />
                      )
                    return (
                      <StyledTableCell
                        key={val}
                        variant="head"
                        align="center"
                      />
                    )
                  })}
                  <StyledTableCell variant="head" align="center">
                    {v.attendance.length}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
        >
          <Box
            sx={{
              width: 'fit-content',
              display: 'flex',
              justifyContent: 'flex-end',
              border: '1px solid black',
              p: 2,
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 2,
              }}
            >
              <Box sx={{ bgcolor: 'green', width: 30, height: 30 }} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Ирсэн
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 2,
              }}
            >
              <Box sx={{ bgcolor: 'red', width: 30, height: 30 }} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Ирээгүй
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                mr: 2,
              }}
            >
              <Box sx={{ bgcolor: 'cyan', width: 30, height: 30 }} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                Бусад
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ViewAttendanceContainer

const response = {
  data: [
    {
      student_id: 'B190910801',
      student_name: 'Student 1',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 2',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 3,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 5,
          status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 3, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 1',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 2',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 3,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 5,
          status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 3, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 1',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 2',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 3,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 5,
          status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 3, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 1',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 2',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 3,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 5,
          status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 3, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 1',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 2',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 3,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 5,
          status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 3, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 1',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 2',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 3,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 5,
          status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 3, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 1',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 2',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 3,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 5,
          status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 3, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 1',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 2',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 3,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 5,
          status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 3, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 1',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
    {
      student_id: 'B190910801',
      student_name: 'Student 2',
      attendance: [
        {
          week: 1,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 2,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 3,
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        {
          week: 5,
          status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
        //...
        {
          week: 16,
          status: 3, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        },
      ],
    },
  ],
}
