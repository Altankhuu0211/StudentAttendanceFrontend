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
import { tableCellClasses } from '@mui/material/TableCell'
import Loading from '@components/Loading'
import { ATTENDANCE_STATUS, CLASS_TYPE, SEMESTER_WEEK } from '@constants/common'
import {
  fetchRecordance,
  getLessonSchedule,
  getSemesterWeek,
} from '@services/index'
import { PageRoutes } from '@constants/routes.constants'
import { getFromStorage } from '@utils/common'

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
  const router = useRouter()
  const teacher_id = getFromStorage('user_code')
  const [defaultValues, setDefaultValues] = useState<
    | {
        class_type: string
        code: string
        name: string
        schedule_time: string
      }
    | undefined
  >(undefined)
  const [selectSubject, setSelectSubject] = useState('none')
  const [selectLecture, setSelectLecture] = useState('none')
  const [selectSeminar, setSelectSeminar] = useState('none')
  const [selectLab, setSelectLab] = useState('none')
  const [selectSemesterWeek, setSelectSemesterWeek] = useState('none')
  const [searchText, setSearchText] = useState('')
  const [showClearIcon, setShowClearIcon] = useState(false)

  useEffect(() => {
    if (router.isReady) {
      console.log(JSON.parse(String(router.query.data)))
      setDefaultValues(JSON.parse(String(router.query.data)))
    }
  }, [router])

  useEffect(() => {
    if (!searchText) setShowClearIcon(false)
    if (searchText.length === 1) setShowClearIcon(true)
  }, [searchText])

  const payload: {
    teacher_id: string
    subject_id: string
    week_day: number
    part_time: number
    semester_week: number
  } = {
    teacher_id: 'B.ES48',
    subject_id: 'F.CS101',
    week_day: 2,
    part_time: 5,
    semester_week: 15,
  }

  const { status: weekStatus, data: weekData } = useQuery(
    'semester-week',
    () => {
      return getSemesterWeek()
    }
  )

  const { status: lessonStatus, data: lessonData } = useQuery(
    ['lesson-schedule', teacher_id],
    () => {
      return getLessonSchedule({ teacher_id: teacher_id })
    }
  )

  const { status: recordStatus, data: recordData } = useQuery(
    ['student-attendance', payload],
    () => {
      return fetchRecordance(payload)
    }
  )

  const response = recordData?.data?.data
  const lesson = lessonData?.data?.data
  const semester_week = weekData?.data?.data
  let selectDefault = 'none'

  useEffect(() => {
    if (defaultValues && lesson) {
      console.log('lesson', lesson, defaultValues.code)
      const defaultLesson = _.find(lesson, function (v) {
        return v.id === defaultValues.code
      })
      if (defaultLesson) {
        setSelectSubject(defaultLesson.id)
        if (defaultValues.class_type === CLASS_TYPE[0].type) {
          setSelectLecture(defaultValues.schedule_time)
        } else if (defaultValues.class_type === CLASS_TYPE[1].type) {
          setSelectLab(defaultValues.schedule_time)
        } else {
          setSelectSeminar(defaultValues.schedule_time)
        }
      }
    }
  }, [defaultValues, lesson])

  useEffect(() => {
    if (semester_week) {
      setSelectSemesterWeek(String(semester_week))
    }
  }, [semester_week])

  if (
    _.isEmpty(defaultValues) ||
    recordStatus != 'success' ||
    weekStatus != 'success' ||
    lessonStatus != 'success'
  )
    return <Loading />

  const handleSelectSubject = (event: SelectChangeEvent) => {
    setSelectSubject(event.target.value)
    console.log(lesson)
    lesson &&
      lesson.map((item) => {
        if (item.id == event.target.value) {
          setSelectLecture(selectDefault)
          selectDefault = item.lecture[0]
          console.log('default:', selectDefault)
        }
      })
    setSelectLecture(selectDefault)
    setSelectLab('none')
    setSelectSeminar('none')
    // To do on change run fetchRecordance
  }

  const handleSelectLecture = (event: SelectChangeEvent) => {
    setSelectLecture(event.target.value)
    setSelectSeminar('none')
    setSelectLab('none')
  }

  const handleSelectSeminar = (event: SelectChangeEvent) => {
    setSelectSeminar(event.target.value)
    setSelectLecture('none')
    setSelectLab('none')
  }

  const handleSelectLab = (event: SelectChangeEvent) => {
    setSelectLab(event.target.value)
    setSelectSeminar('none')
    setSelectLecture('none')
  }

  const handleSelectSemesterWeek = (event: SelectChangeEvent) => {
    setSelectSemesterWeek(event.target.value)
  }

  const handleBeginRegister = () => {
    console.log('begin register button clicked ...')
    router.push('/report')
  }

  const handleReport = () => {
    // const [exp_weekday, exp_parttime] = _.split('4-2', '-')
    let class_type = CLASS_TYPE[0].type
    let schedule_time = selectLecture
    if (selectLecture != 'none') {
      class_type = CLASS_TYPE[0].type
      schedule_time = selectLecture
    } else if (selectLab != 'none') {
      class_type = CLASS_TYPE[1].type
      schedule_time = selectLab
    } else {
      class_type = CLASS_TYPE[2].type
      schedule_time = selectSeminar
    }

    const paramData = {
      code: selectSubject,
      class_type: class_type,
      schedule_time: schedule_time,
    }
    router.push({
      pathname: PageRoutes.REPORT,
      query: { data: JSON.stringify(paramData) },
    })
  }

  const handleEditStatus = () => {
    console.log('save button clicked ...')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value)
  }

  const handleClick = () => {
    setSearchText('')
  }

  const handleChangeStatus = (
    event: SelectChangeEvent<string>,
    student_id: string
  ) => {
    console.log('edited:', event.target.value, student_id)
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
            {`Хичээлийн ${semester_week}-р долоо хоног`}
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
              {Number(response?.total_sick) + Number(response?.total_free)}
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
          sx={{
            mr: 1.5,
            fontWeight: selectSubject != 'none' ? 700 : 400,
            color: selectSubject != 'none' ? 'black' : 'grey',
          }}
        >
          <MenuItem value="none" disabled>
            {`${t('selection.lesson')}`}
          </MenuItem>
          {lesson &&
            lesson.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              )
            })}
        </Select>
        <Select
          value={selectLecture}
          onChange={handleSelectLecture}
          fullWidth
          sx={{
            mr: 1.5,
            fontWeight: selectLecture != 'none' ? 700 : 400,
            color: selectLecture != 'none' ? 'black' : 'grey',
          }}
        >
          <MenuItem value="none" disabled>
            {`${t('selection.lecture')}`}
          </MenuItem>
          {lesson &&
            lesson.map((item) => {
              if (item.id == selectSubject)
                return item.lecture.map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  )
                })
            })}
        </Select>
        <Select
          value={selectSeminar}
          onChange={handleSelectSeminar}
          fullWidth
          sx={{
            mr: 1.5,
            fontWeight: selectSeminar != 'none' ? 700 : 400,
            color: selectSeminar != 'none' ? 'black' : 'grey',
          }}
        >
          <MenuItem value="none" disabled>
            {`${t('selection.seminar')}`}
          </MenuItem>
          {lesson &&
            lesson.map((item) => {
              if (item.id == selectSubject)
                return item.seminar.map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  )
                })
            })}
        </Select>
        <Select
          value={selectLab}
          onChange={handleSelectLab}
          fullWidth
          sx={{
            mr: 1.5,
            fontWeight: selectLab != 'none' ? 700 : 400,
            color: selectLab != 'none' ? 'black' : 'grey',
          }}
        >
          <MenuItem value="none" disabled>
            {`${t('selection.laborator')}`}
          </MenuItem>
          {lesson &&
            lesson.map((item) => {
              if (item.id == selectSubject)
                return item.laborator.map((val) => {
                  return (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  )
                })
            })}
        </Select>
        <Select
          value={selectSemesterWeek}
          onChange={handleSelectSemesterWeek}
          fullWidth
          sx={{
            mr: 1.5,
            fontWeight: selectSemesterWeek != 'none' ? 700 : 400,
            color: selectSemesterWeek != 'none' ? 'black' : 'grey',
          }}
        >
          <MenuItem value={0} disabled>
            {`${t('selection.semester_week')}`}
          </MenuItem>
          {SEMESTER_WEEK.map((item, idx) => {
            return (
              <MenuItem key={idx + 1} value={String(idx + 1)}>
                {item}
              </MenuItem>
            )
          })}
        </Select>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={`${t('selection.date')}`}
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue)
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </LocalizationProvider> */}
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
                  sx={{ width: 50 }}
                >
                  {`№`}
                </StyledTableCell>
                <StyledTableCell
                  variant="head"
                  align="center"
                  sx={{ width: 250 }}
                >
                  {`${t('common.student_code')}`}
                </StyledTableCell>
                <StyledTableCell
                  variant="head"
                  align="center"
                  sx={{ width: 250 }}
                >
                  {`${t('common.student_lname')}`}
                </StyledTableCell>
                <StyledTableCell
                  variant="head"
                  align="center"
                  sx={{ width: 250 }}
                >
                  {`${t('common.student_fname')}`}
                </StyledTableCell>
                <StyledTableCell
                  variant="head"
                  align="center"
                  sx={{ width: 200 }}
                >
                  {`${t('common.status')}`}
                </StyledTableCell>
                <StyledTableCell
                  variant="head"
                  align="center"
                  sx={{ width: 200 }}
                >
                  {`${t('common.arrival_time')}`}
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {response?.attendance.map((v, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell align="center">{i + 1}</StyledTableCell>
                  <StyledTableCell align="left">{v.student_id}</StyledTableCell>
                  <StyledTableCell align="left">
                    {v.student_lname}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {v.student_fname}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Select
                      defaultValue={ATTENDANCE_STATUS[v.status]}
                      // value={ATTENDANCE_STATUS[v.status]}
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
