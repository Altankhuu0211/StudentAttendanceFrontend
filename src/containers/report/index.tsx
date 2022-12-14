import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useQuery } from 'react-query'
import moment from 'moment'
import { t } from 'i18next'
import Colors from '@theme/colors'
import { useRouter } from 'next/router'

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
import {
  fetchReport,
  getSemesterWeek,
  getLessonSchedule,
} from '@services/index'
import { CLASS_TYPE } from '@constants/common'

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

const ReportContainer: React.FC<Props> = () => {
  const router = useRouter()
  const [defaultValues, setDefaultValues] = useState<
    | {
        class_type: string
        code: string
        schedule_time: string
      }
    | undefined
  >(undefined)
  const [selectSubject, setSelectSubject] = useState('none')
  const [selectLecture, setSelectLecture] = useState('none')
  const [selectSeminar, setSelectSeminar] = useState('none')
  const [selectLab, setSelectLab] = useState('none')

  useEffect(() => {
    if (router.isReady) {
      console.log(JSON.parse(String(router.query.data)))
      setDefaultValues(JSON.parse(String(router.query.data)))
    }
  }, [router])

  const payload = {
    teacher_id: 'B.ES48',
    subject_id: 'F.CS101',
    week_day: 2,
    part_time: 5,
  }

  const { status: lessonStatus, data: lessonData } = useQuery(
    ['lesson-schedule', 'J.SW10'],
    () => {
      return getLessonSchedule({ teacher_id: 'J.SW10' })
    }
  )

  const { status: repordStatus, data: repordData } = useQuery(
    ['attendance-report', payload],
    () => {
      return fetchReport(payload)
    }
  )

  const { status: weekStatus, data: weekData } = useQuery(
    'semester-week',
    () => {
      return getSemesterWeek()
    }
  )
  console.log('reportdata:', repordData)
  const response = repordData?.data
  const semester_week = weekData?.data?.data
  const lesson = lessonData?.data
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

  if (
    repordStatus != 'success' ||
    weekStatus != 'success' ||
    lessonStatus != 'success'
  ) {
    return <Loading />
  }

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
              <Box sx={{ bgcolor: Colors.present, width: 30, height: 30 }} />
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
              <Box sx={{ bgcolor: Colors.absent, width: 30, height: 30 }} />
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
              <Box sx={{ bgcolor: Colors.others, width: 30, height: 30 }} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {`${t('common.others')}`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ReportContainer
