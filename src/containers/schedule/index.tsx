import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useQuery } from 'react-query'
import moment from 'moment'
import { t } from 'i18next'
import Colors from '@theme/colors'

// components
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  ListSubheader,
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

// constants
import {
  PART_TIME,
  WEEKDAY,
  CLASS_TYPE,
  SEMESTER_WEEK,
} from '@constants/common'
import { useRouter } from 'next/router'
import {
  getSemesterWeek,
  fetchSchedule,
  getLessonSchedule,
  getAnalyticsData,
} from '@services/index'
import {
  combineScheduleTime,
  getFromStorage,
  seperateScheduleTime,
} from '@utils/common'
import { PageRoutes } from '@constants/routes.constants'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    border: '1px solid black',
    padding: '14px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: '1px solid black',
    padding: '14px',
  },
}))

const ScheduleContainer: React.FC<{}> = () => {
  const router = useRouter()
  const [teacherCode, setTeacherCode] = useState<string>('')
  const [schedule, setSchedule] = useState<string>('')

  useEffect(() => {
    setTeacherCode(getFromStorage('user_code') || '')
  }, [])

  const { status: scheduleStatus, data: scheduleData } = useQuery(
    ['teacher-schedule', teacherCode],
    () => fetchSchedule({ teacher_id: teacherCode }),
    { enabled: !!teacherCode }
  )

  const { status: weekStatus, data: weekData } = useQuery('semester-week', () =>
    getSemesterWeek()
  )

  const { status: lessonsStatus, data: lessonsData } = useQuery(
    'teacher-lessons',
    () => getLessonSchedule({ teacher_id: teacherCode }),
    { enabled: !!teacherCode }
  )

  const {
    data: analyticsData,
    refetch: analyticsRefetch,
    isFetching,
  } = useQuery(
    'analytics',
    () =>
      getAnalyticsData({
        teacher_id: teacherCode,
        week_day: seperateScheduleTime(schedule).week_day,
        part_time: seperateScheduleTime(schedule).part_time,
      }),
    { enabled: !!teacherCode && !!schedule }
  )

  const response = scheduleData?.data?.data
  const semester_week = weekData?.data?.data
  const lessons = lessonsData?.data?.data
  const analytics = analyticsData?.data?.data

  useEffect(() => {
    if (lessons) {
      const allSchedule = [
        ...lessons[0]?.lecture,
        ...lessons[0]?.laborator,
        ...lessons[0]?.seminar,
      ]
      setSchedule(allSchedule[0])
    }
  }, [lessons])

  useEffect(() => {
    if (!isFetching) analyticsRefetch()
  }, [schedule])

  const handleSubjectClick = (obj: any) => {
    let paramData = obj
    paramData = {
      ...paramData,
      schedule_time: combineScheduleTime(obj.weekday, obj.part_time),
    }

    delete paramData.weekday
    delete paramData.part_time

    router.push({
      pathname: PageRoutes.ATTENDANCE,
      query: { data: JSON.stringify(paramData) },
    })
  }

  const handleChangeSchedule = (event: SelectChangeEvent) => {
    setSchedule(event.target.value)
  }

  if (
    scheduleStatus != 'success' ||
    weekStatus != 'success' ||
    lessonsStatus != 'success'
  )
    return <Loading />

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ overflowX: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: Colors.secondBlue,
            color: Colors.mainWhite,
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
        <TableContainer component={Paper}>
          <Table
            aria-label="caption table"
            sx={{
              minWidth: 1200,
              width: '100%',
            }}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell
                  variant="head"
                  align="center"
                  sx={{
                    bgcolor: Colors.secondBlue,
                    color: Colors.mainWhite,
                    width: 250,
                  }}
                >
                  {`${t('common.class_time')}`}
                </StyledTableCell>
                {WEEKDAY.map((v, i) => {
                  return (
                    <StyledTableCell
                      key={i}
                      variant="head"
                      align="center"
                      sx={{
                        bgcolor: Colors.secondBlue,
                        color: Colors.mainWhite,
                        width: 250,
                      }}
                    >
                      {v.name}
                    </StyledTableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {PART_TIME.map((v, i) => (
                <TableRow key={i}>
                  <StyledTableCell align="center">{`${v.number}-р цаг: ${v.time_interval}`}</StyledTableCell>
                  {_.range(0, 5).map((_val, idx) => {
                    return (
                      <StyledTableCell key={idx * 10 + i} align="center">
                        {!_.isEmpty(response) && response[i][idx] != null && (
                          <Box
                            key={idx * 10 + i}
                            onClick={() => handleSubjectClick(response[i][idx])}
                            sx={{
                              bgcolor: CLASS_TYPE.map((va) => {
                                return va.type === response[i][idx].class_type
                                  ? va.color
                                  : null
                              }),
                              m: '-14px',
                              cursor: 'pointer',
                              opacity: 1,
                              transition: '0.3s',
                              '&:hover': {
                                opacity: 0.7,
                              },
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              {response[i][idx].subject_id}
                            </Typography>
                            <Typography variant="body2">
                              {response[i][idx].name}
                            </Typography>
                            <Typography variant="body2">
                              {response[i][idx].class_type} №
                              {response[i][idx].class_id}
                            </Typography>
                          </Box>
                        )}
                      </StyledTableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', mt: 2, justifyContent: 'flex-end' }}>
          {CLASS_TYPE.map((value, i) => {
            return (
              <Box
                key={i}
                sx={{
                  bgcolor: value.color,
                  width: 127,
                  height: 40,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid black',
                  ml: 2,
                  textAlign: 'center',
                  fontSize: 14,
                }}
              >
                {`${value.type}`}
              </Box>
            )
          })}
        </Box>
        <Divider sx={{ my: 3 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 3,
          }}
        >
          <Typography variant="h2">Аналитик</Typography>
          <FormControl sx={{ width: 350 }}>
            <InputLabel>Хичээлийн цагууд</InputLabel>
            <Select
              label="Хичээлийн цагууд"
              value={schedule}
              onChange={handleChangeSchedule}
            >
              <MenuItem disabled value={''}>
                <em>Хичээлийн цаг сонгоно уу</em>
              </MenuItem>
              {lessons?.map((lesson, index) => [
                <ListSubheader
                  key={index}
                  sx={{ fontWeight: 600 }}
                >{`${lesson.id} | ${lesson.name}`}</ListSubheader>,
                !_.isEmpty(lesson.lecture)
                  ? lesson.lecture.map((data) => (
                      <MenuItem
                        key={data}
                        value={data}
                      >{`Лекц ${data}`}</MenuItem>
                    ))
                  : null,
                !_.isEmpty(lesson.laborator) &&
                  lesson.laborator.map((data) => (
                    <MenuItem key={data} value={data}>{`Лаб ${data}`}</MenuItem>
                  )),
                !_.isEmpty(lesson.seminar) &&
                  lesson.seminar.map((data) => (
                    <MenuItem
                      key={data}
                      value={data}
                    >{`Семинар ${data}`}</MenuItem>
                  )),
              ])}
            </Select>
          </FormControl>
        </Box>
        {!_.isEmpty(analytics) && _.isArray(analytics) && (
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
            data={{
              labels: SEMESTER_WEEK,
              datasets: [
                {
                  label: 'Ирсэн',
                  data: analytics.map((analytic) => analytic.total_present),
                  borderColor: 'rgb(18, 159, 44)',
                  backgroundColor: 'rgba(18, 159, 44, 0.5)',
                },
                {
                  label: 'Ирээгүй',
                  data: analytics.map((analytic) => analytic.total_absent),
                  borderColor: 'rgb(171, 39, 39)',
                  backgroundColor: 'rgba(171, 39, 39, 0.5)',
                },
                {
                  label: 'Чөлөөтэй',
                  data: analytics.map((analytic) => analytic.total_free),
                  borderColor: 'rgb(49, 144, 182)',
                  backgroundColor: 'rgba(49, 144, 182, 0.5)',
                },
                {
                  label: 'Өвчтэй',
                  data: analytics.map((analytic) => analytic.total_sick),
                  borderColor: 'rgb(	255, 224, 68)',
                  backgroundColor: 'rgba(	255, 224, 68, 0.5)',
                },
              ],
            }}
          />
        )}
      </Box>
    </Box>
  )
}

export default ScheduleContainer
