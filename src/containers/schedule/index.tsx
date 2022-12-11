import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useQuery } from 'react-query'
import moment from 'moment'
import { t } from 'i18next'
import Colors from '@theme/colors'

// components
import { Box, Typography } from '@mui/material'
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
import { PART_TIME, WEEKDAY, CLASS_TYPE } from '@constants/common'
import { useRouter } from 'next/router'
import { fetchSchedule, getSemesterWeek } from '@services/index'
import { combineScheduleTime, getFromStorage } from '@utils/common'
import { PageRoutes } from '@constants/routes.constants'

const ScheduleContainer: React.FC<{}> = () => {
  const router = useRouter()
  const [teacherCode, setTeacherCode] = useState<string>('')

  useEffect(() => {
    setTeacherCode(getFromStorage('user_code') || '')
  }, [])

  const { status: scheduleStatus, data: scheduleData } = useQuery(
    ['teacher-schedule', teacherCode],
    () => {
      return fetchSchedule({ teacher_id: teacherCode })
    }
  )

  const { status: weekStatus, data: weekData } = useQuery(
    'semester-week',
    () => {
      return getSemesterWeek()
    }
  )

  if (scheduleStatus != 'success' || weekStatus != 'success') {
    return <Loading />
  }

  const response = scheduleData?.data?.data
  const semester_week = weekData?.data?.data

  const handleSubjectClick = (subject: any, weekday: number) => {
    let paramData = subject
    paramData = {
      ...paramData,
      schedule_time: combineScheduleTime(weekday, paramData.part_time),
    }
    delete paramData.part_time
    router.push({
      pathname: PageRoutes.ATTENDANCE,
      query: { data: JSON.stringify(paramData) },
    })
  }

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

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={
          {
            // maxWidth: 1200,
          }
        }
      >
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
          <Table aria-label="caption table" sx={{ width: 1200 }}>
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
                        {!_.isEmpty(response) &&
                          response[idx]?.Subjects.map((subject, index) => {
                            return (
                              subject.part_time === v.number && (
                                <Box
                                  key={index}
                                  onClick={() =>
                                    handleSubjectClick(
                                      subject,
                                      response[idx]?.weekday
                                    )
                                  }
                                  sx={{
                                    bgcolor: CLASS_TYPE.map((va) => {
                                      return va.type === subject.class_type
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
                                    {subject.code}
                                  </Typography>
                                  <Typography variant="body2">
                                    {subject.name}
                                  </Typography>
                                  <Typography variant="body2">
                                    {subject.class_type} №{subject.class_number}
                                  </Typography>
                                </Box>
                              )
                            )
                          })}
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
      </Box>
    </Box>
  )
}

export default ScheduleContainer
