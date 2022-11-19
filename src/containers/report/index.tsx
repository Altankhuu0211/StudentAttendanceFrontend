import React, { useState } from 'react'
import _ from 'lodash'
import { useQuery } from 'react-query'
import moment from 'moment'
import { t } from 'i18next'

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
import Loading from '@components/Loading'
import { ATTENDANCE_STATUS } from '@constants/common'
import { fetchReport } from '@services/index'

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

const ReportContainer: React.FC<Props> = () => {
  const [selectSubject, setSelectSubject] = useState('none')
  const [selectLecture, setSelectLecture] = useState('none')
  const [selectSeminar, setSelectSeminar] = useState('none')
  const [selectLaboratory, setSelectLaboratory] = useState('none')
  const [selectAssignment, setSelectAssignment] = useState('none')
  const payload = {
    teacher_id: 'J.SW10',
    subject_id: 'F.CS101',
    class_type: 'Лекц',
    schedule_time: '4-1',
  }
  const { status: repordStatus, data: repordData } = useQuery(
    ['attendance-report', payload],
    () => {
      return fetchReport(payload)
    }
  )

  if (repordStatus != 'success') {
    return <Loading />
  }

  const response = repordData?.data

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
            {`${t('selection.lesson')}`}
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
            {`${t('selection.lecture')}`}
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
            {`${t('selection.seminar')}`}
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
            {`${t('selection.laborator')}`}
          </MenuItem>
          <MenuItem value="mon-2">{'Даваа-2'}</MenuItem>
        </Select>
        <Select
          value={selectAssignment}
          onChange={handleSelectAssignment}
          fullWidth
        >
          <MenuItem value="none" disabled>
            {`${t('selection.assignment')}`}
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
                  {`${t('common.student_code')}`}
                </StyledTableCell>
                <StyledTableCell variant="head" align="center">
                  {`${t('common.student_lname')}`}
                </StyledTableCell>
                <StyledTableCell variant="head" align="center">
                  {`${t('common.student_fname')}`}
                </StyledTableCell>
                {_.range(1, 17).map((val, id) => {
                  return (
                    <StyledTableCell key={id} variant="head" align="center">
                      {val}
                    </StyledTableCell>
                  )
                })}
                <StyledTableCell variant="head" align="center">
                  {`${t('common.total_attendance')}`}
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {response?.map((v, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell align="center">
                    {v.student_id}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {v.student_lname}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {v.student_fname}
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
                {`${t('common.present')}`}
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
                {`${t('common.absent')}`}
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
                {`${t('selection.others')}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ReportContainer