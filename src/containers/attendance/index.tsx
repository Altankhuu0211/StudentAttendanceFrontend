import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { useRouter } from 'next/router'
import moment from 'moment'
import { useQuery } from 'react-query'
import { t } from 'i18next'
import Colors from '@theme/colors'

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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { tableCellClasses } from '@mui/material/TableCell'
import Loading from '@components/Loading'
import { ATTENDANCE_STATUS } from '@constants/common'
import { fetchRecordance } from '@services/index'

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

type Props = {}

const RecordAttendanceContainer: React.FC<Props> = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectSubject, setSelectSubject] = useState('none')
  const [selectLecture, setSelectLecture] = useState('none')
  const [selectSeminar, setSelectSeminar] = useState('none')
  const [selectLaboratory, setSelectLaboratory] = useState('none')
  const [selectAssignment, setSelectAssignment] = useState('none')
  const router = useRouter()

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
  const payload = {
    teacher_id: 'J.SW10',
    subject_id: 'F.CS101',
    class_type: 'Лекц',
    schedule_time: '4-1',
    date: '2022-10-02',
  }

  const { status: recordStatus, data: recordData } = useQuery(
    ['student-attendance', payload],
    () => {
      return fetchRecordance(payload)
    }
  )

  useEffect(() => {
    if (!searchText) setShowClearIcon(false)
    if (searchText.length === 1) setShowClearIcon(true)
  }, [searchText])

  if (recordStatus != 'success') {
    return <Loading />
  }

  const response = recordData?.data

  const handleBeginRegister = () => {
    console.log('begin register button clicked ...')
    router.push('/report')
  }

  const handleReport = () => {
    console.log('report button clicked ...')
    router.push('/report')
  }

  const handleEditStatus = () => {
    console.log('report button clicked ...')
    router.push('/report')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value)
  }

  const handleClick = () => {
    setSearchText('')
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
          bgcolor: Colors.secondary,
          color: Colors.mainWhite,
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
          color: Colors.mainWhite,
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
            <Typography variant="body2" sx={{ color: Colors.mainBlack }}>
              {`${t('common.total_student')}`}: {response?.total_students}
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
                color: Colors.others,
                whiteSpace: 'pre-line',
                textAlign: 'center',
              }}
            >
              {`${t('common.others')}`}:{' '}
              {response?.total_sick + response?.total_free}
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
                color: Colors.absent,
                whiteSpace: 'pre-line',
                textAlign: 'center',
              }}
            >
              {`${t('common.absent')}`}: {response?.total_absent}
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
                color: Colors.present,
                whiteSpace: 'pre-line',
                textAlign: 'center',
              }}
            >
              {`${t('common.present')}`}: {response?.total_present}
            </Typography>
          </Box>
        </Box>
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
              sx={{ mr: 2, bgcolor: Colors.btn }}
              onClick={handleBeginRegister}
            >
              {`${t('common.start')}`}
            </Button>
            <Button variant="contained" onClick={handleReport}>
              {`${t('common.report')}`}
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
          color: Colors.mainWhite,
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={`${t('selection.date')}`}
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue)
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider>
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
                <StyledTableCell variant="head" align="center">
                  {`${t('common.status')}`}
                </StyledTableCell>
                <StyledTableCell variant="head" align="center">
                  {`${t('common.arrival_time')}`}
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {response?.attendance.map((v, i) => (
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
                      onChange={(e) => handleChangeStatus(e, i)}
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
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}>
          <Button variant="contained" onClick={handleEditStatus}>
            {`${t('common.save')}`}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default RecordAttendanceContainer
