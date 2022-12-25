import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { useQuery } from 'react-query'
import { t } from 'i18next'
import Colors from '@theme/colors'
import { useRouter } from 'next/router'

// components
import { Box, SelectChangeEvent, Typography } from '@mui/material'
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
import { fetchReport, getLessonSchedule } from '@services/index'
import { CLASS_TYPE } from '@constants/common'
import DatePanel from './DatePanel'
import FilterPanel from './FilterPanel'
import TablePanel from './TablePanel'
import { LessonsProps, ReportParamProps, ReportProps } from '@constants/types'

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

type Props = {
  code: string
  week: string
}

const ReportContainer: React.FC<Props> = ({ code, week }) => {
  const router = useRouter()
  const [selectSubject, setSelectSubject] = useState('none')
  const [selectLecture, setSelectLecture] = useState('none')
  const [selectSeminar, setSelectSeminar] = useState('none')
  const [selectLab, setSelectLab] = useState('none')
  const [report, setReport] = useState<ReportProps[] | undefined>(undefined)
  const [reportParam, setReportParam] = useState<ReportParamProps | {}>({})

  const [lesson, setLesson] = useState<LessonsProps>([])

  useEffect(() => {
    if (router.isReady) {
      const paramData = JSON.parse(String(router.query.data))
      console.log('paramData:', paramData)
      setSelectSubject(paramData.subject_code)
      if (paramData.class_type === CLASS_TYPE[0].type)
        setSelectLecture(paramData.schedule_time)
      else if (paramData.class_type === CLASS_TYPE[1].type)
        setSelectLab(paramData.schedule_time)
      else setSelectSeminar(paramData.schedule_time)

      const [week_day, part_time] = _.split(paramData.schedule_time, '-', 2)
      setReportParam({
        teacher_id: code,
        subject_id: paramData.subject_code,
        week_day: Number(week_day),
        part_time: Number(part_time),
      })
      console.log('reportParam', reportParam)
    }
  }, [router])

  const { status: lessonStatus, data: lessonData } = useQuery(
    ['teacher-schedule', code],
    () => {
      return getLessonSchedule({ teacher_id: code })
    }
  )

  const {
    status: reportStatus,
    data: reportData,
    refetch: reportRefetch,
  } = useQuery(['attendance-report', reportParam], () => {
    return fetchReport(reportParam)
  })

  useEffect(() => {
    if (reportData) {
      setReport(reportData?.data?.data)
    }
  }, [reportData])

  useEffect(() => {
    if (lessonData) {
      setLesson(lessonData?.data?.data)
    }
  }, [lessonData])

  const handleSelectSubject = (event: SelectChangeEvent) => {
    setSelectSubject(event.target.value)
    const selectDefault =
      lesson &&
      _.find(lesson, function (o) {
        return o.id == event.target.value
      })

    setSelectLecture(selectDefault?.lecture[0] || 'none')
    setSelectLab('none')
    setSelectSeminar('none')
    const [week_day, part_time] = _.split(selectDefault?.lecture[0], '-', 2)
    setReportParam({
      ...reportParam,
      week_day: Number(week_day),
      part_time: Number(part_time),
    })
  }

  const handleSelectLecture = (event: SelectChangeEvent) => {
    setSelectLecture(event.target.value)
    setSelectSeminar('none')
    setSelectLab('none')
    const [week_day, part_time] = _.split(event.target.value, '-', 2)
    setReportParam({
      ...reportParam,
      week_day: Number(week_day),
      part_time: Number(part_time),
    })
  }

  const handleSelectSeminar = (event: SelectChangeEvent) => {
    setSelectSeminar(event.target.value)
    setSelectLecture('none')
    setSelectLab('none')
    const [week_day, part_time] = _.split(event.target.value, '-', 2)
    setReportParam({
      ...reportParam,
      week_day: Number(week_day),
      part_time: Number(part_time),
    })
  }

  const handleSelectLab = (event: SelectChangeEvent) => {
    setSelectLab(event.target.value)
    setSelectSeminar('none')
    setSelectLecture('none')
    const [week_day, part_time] = _.split(event.target.value, '-', 2)
    setReportParam({
      ...reportParam,
      week_day: Number(week_day),
      part_time: Number(part_time),
    })
  }

  useEffect(() => {
    reportRefetch()
  }, [reportParam])

  if (reportStatus != 'success' || lessonStatus != 'success') {
    return <Loading />
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <DatePanel week={week} />
        <FilterPanel
          lesson={lesson}
          selectSubject={selectSubject}
          selectLecture={selectLecture}
          selectSeminar={selectSeminar}
          selectLab={selectLab}
          handleChangeSubject={handleSelectSubject}
          handleChangeLecture={handleSelectLecture}
          handleChangeSeminar={handleSelectSeminar}
          handleChangeLab={handleSelectLab}
        />
        <TableContainer component={Paper}>
          <Table aria-label="caption table" sx={{ width: '100%' }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell variant="head" align="center">
                  {`№`}
                </StyledTableCell>
                <StyledTableCell
                  variant="head"
                  align="center"
                  sx={{ width: 150 }}
                >
                  {`${t('common.student_code')}`}
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
              <TablePanel reportData={report} />
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
