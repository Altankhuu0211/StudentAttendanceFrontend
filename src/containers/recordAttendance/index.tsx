import React, { useEffect, useState } from 'react'
import _ from 'lodash'

import moment from 'moment'

// components
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Search as IconSearch, Clear as IconClear } from '@mui/icons-material'
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

// constants

moment.locale('mn')

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

const RecordAttendanceContainer: React.FC<Props> = () => {
  const [selectSubject, setSelectSubject] = useState('')
  const [selectLecture, setSelectLecture] = useState('')
  const [selectSeminar, setSelectSeminar] = useState('')
  const [selectLaboratory, setSelectLaboratory] = useState('')
  const [selectAssignment, setSelectAssignment] = useState('')

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

  const [searchText, setSearchText] = useState('')
  const [showClearIcon, setShowClearIcon] = useState(false)

  const handleBeginRegister = () => {
    console.log('begin register button clicked ...')
  }

  const handleReport = () => {
    console.log('report button clicked ...')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value)
  }

  const handleClick = () => {
    setSearchText('')
  }

  useEffect(() => {
    if (!searchText) setShowClearIcon(false)
    if (searchText.length === 1) setShowClearIcon(true)
  }, [searchText])

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

  const renderInfoPanel = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          p: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
          borderRight: '1px solid black',
          borderLeft: '1px solid black',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '50%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              border: '1px solid black',
              height: 70,
            }}
          >
            <Typography variant="body2" sx={{ color: 'black' }}>
              Нийт оюутан: {response?.data?.total_students}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              borderTop: '1px solid black',
              borderBottom: '1px solid black',
              height: 70,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'yellow',
                whiteSpace: 'pre-line',
                textAlign: 'center',
              }}
            >
              {`Нэмэлт 
            ${response?.data?.total_sick + response?.data?.total_free}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              borderTop: '1px solid black',
              borderBottom: '1px solid black',
              borderLeft: '1px solid black',
              height: 70,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'red',
                whiteSpace: 'pre-line',
                textAlign: 'center',
              }}
            >
              {`Ирээгүй
            ${response?.data?.total_absent}`}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              border: '1px solid black',
              height: 70,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'green',
                whiteSpace: 'pre-line',
                textAlign: 'center',
              }}
            >
              {`Ирсэн 
            ${response?.data?.total_present}`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: '100%',
                mb: 2,
              }}
            >
              <Button
                variant="contained"
                fullWidth
                sx={{ mr: 2, bgcolor: 'orange' }}
                onClick={handleBeginRegister}
              >
                Ирцийн бүртгэл эхлүүлэх
              </Button>
              <Button variant="contained" onClick={handleReport}>
                ТАЙЛАН
              </Button>
            </Box>
            <Box sx={{ width: '100%' }}>
              <TextField
                size="small"
                variant="outlined"
                onChange={handleChange}
                value={searchText}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconSearch />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      style={{
                        display: showClearIcon ? 'flex' : 'none',
                        cursor: 'pointer',
                      }}
                      onClick={handleClick}
                    >
                      <IconClear />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Box>
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
        {renderInfoPanel()}
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
            sx={{
              '& fieldset': {
                border: 'none',
              },
            }}
          >
            <MenuItem value="" disabled>
              {'Хичээл сонгоно уу'}
            </MenuItem>
            <MenuItem value="F.IT20">{'F.IT202 Веб зохиомж'}</MenuItem>
          </Select>
        </Box>
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
                <StyledTableCell variant="head" align="center">
                  Төлөв
                </StyledTableCell>
                <StyledTableCell variant="head" align="center">
                  Цаг
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {response?.data?.attendance.map((v, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell align="center">
                    {v.student_id}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {v.student_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{v.status}</StyledTableCell>
                  <StyledTableCell align="center">{v.time}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default RecordAttendanceContainer

const response = {
  data: {
    total_students: 80,
    total_absent: 10,
    total_present: 60,
    total_sick: 2,
    total_free: 8,
    attendance: [
      {
        student_id: 'B190910801',
        student_name: 'Tamir Naranbaatar',
        status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        time: '08:02',
      },
      {
        student_id: 'B190910801',
        student_name: 'Tamir Naranbaatar',
        status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        time: '08:02',
      },
      {
        student_id: 'B190910801',
        student_name: 'Tamir Naranbaatar',
        status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
        time: '08:02',
      },
    ],
  },
}
