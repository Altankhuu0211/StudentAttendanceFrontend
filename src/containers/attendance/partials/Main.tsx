import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { t } from 'i18next'
import Colors from '@theme/colors'
import { postStudentStatusEdited } from '@services/index'

// components
import {
  Box,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  ArrowDropDown as IconArrowDropDown,
  ArrowDropUp as IconArrowDropUp,
} from '@mui/icons-material'
import { tableCellClasses } from '@mui/material/TableCell'
import RefModal from '@components/RefModal'
import { CLASS_TYPE, ATTENDANCE_STATUS } from '@constants/common'
import { fetchRecordance, getLessonSchedule } from '@services/index'
import { PageRoutes } from '@constants/routes.constants'
import {
  LessonsProps,
  RecordanceParamProps,
  RecordanceProps,
  StudentProps,
  StudentStatusEdited,
} from '@constants/types'
import DatePanel from './DatePanel'
import InfoPanel from './InfoPanel'
import FilterPanel from './FilterPanel'
import TablePanel from './TablePanel'
import RegisterModal from './RegisterModal'
import Loading from '@components/Loading'

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

const Main: React.FC<Props> = ({ code, week }) => {
  const router = useRouter()
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailed, setOpenFailed] = useState(false)
  const [showRegister, setShowRegister] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [recordanceParam, setRecordanceParam] = useState<
    RecordanceParamProps | {}
  >({})
  const [studentStatusEditedParam, setStudentStatusEditedParam] = useState<
    StudentStatusEdited | {}
  >({})
  const [record, setRecord] = useState<RecordanceProps | undefined>(undefined)
  const [lesson, setLesson] = useState<LessonsProps>([])
  const [searchedAttendance, setSearchedAttendance] = useState<
    undefined | StudentProps[]
  >(undefined)
  const [sorted, setSorted] = useState<boolean>(false)
  const [selectSubject, setSelectSubject] = useState('none')
  const [selectLecture, setSelectLecture] = useState('none')
  const [selectSeminar, setSelectSeminar] = useState('none')
  const [selectLab, setSelectLab] = useState('none')
  const [selectWeek, setSelectWeek] = useState('0')

  useEffect(() => {
    if (router.isReady) {
      const paramData = JSON.parse(String(router.query.data))
      setSelectWeek(String(week))
      setSelectSubject(paramData.code)
      if (paramData.class_type === CLASS_TYPE[0].type)
        setSelectLecture(paramData.schedule_time)
      else if (paramData.class_type === CLASS_TYPE[1].type)
        setSelectLab(paramData.schedule_time)
      else setSelectSeminar(paramData.schedule_time)

      const [week_day, part_time] = _.split(paramData.schedule_time, '-', 2)
      setRecordanceParam({
        teacher_id: code,
        subject_id: paramData.code,
        semester_week: Number(week),
        week_day: Number(week_day),
        part_time: Number(part_time),
      })
    }
  }, [router])

  const { status: lessonStatus, data: lessonData } = useQuery(
    ['lesson-schedule', code],
    () => {
      return getLessonSchedule({ teacher_id: code })
    }
  )

  const {
    status: recordStatus,
    data: recordData,
    refetch: recordanceRefetch,
  } = useQuery(['student-attendance', recordanceParam], () => {
    return fetchRecordance(recordanceParam)
  })

  useEffect(() => {
    recordanceRefetch()
  }, [recordanceParam])

  useEffect(() => {
    if (recordData) {
      setRecord(recordData?.data?.data)
    }
  }, [recordData])

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
    setRecordanceParam({
      ...recordanceParam,
      subject_id: event.target.value,
      week_day: Number(week_day),
      part_time: Number(part_time),
    })
  }

  const handleSelectLecture = (event: SelectChangeEvent) => {
    setSelectLecture(event.target.value)
    setSelectSeminar('none')
    setSelectLab('none')
    const [week_day, part_time] = _.split(event.target.value, '-', 2)
    setRecordanceParam({
      ...recordanceParam,
      week_day: Number(week_day),
      part_time: Number(part_time),
    })
  }

  const handleSelectSeminar = (event: SelectChangeEvent) => {
    setSelectSeminar(event.target.value)
    setSelectLecture('none')
    setSelectLab('none')
    const [week_day, part_time] = _.split(event.target.value, '-', 2)
    setRecordanceParam({
      ...recordanceParam,
      week_day: Number(week_day),
      part_time: Number(part_time),
    })
  }

  const handleSelectLab = (event: SelectChangeEvent) => {
    setSelectLab(event.target.value)
    setSelectSeminar('none')
    setSelectLecture('none')
    const [week_day, part_time] = _.split(event.target.value, '-', 2)
    setRecordanceParam({
      ...recordanceParam,
      week_day: Number(week_day),
      part_time: Number(part_time),
    })
  }

  const handleSelectWeek = (event: SelectChangeEvent) => {
    setSelectWeek(event.target.value)
    setRecordanceParam({
      ...recordanceParam,
      semester_week: Number(event.target.value),
    })
  }

  const handleBeginRegister = () => {
    setShowRegister(true)
  }

  const handleReport = () => {
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
      teacher_code: code,
      subject_code: selectSubject,
      class_type: class_type,
      schedule_time: schedule_time,
    }

    router.push({
      pathname: PageRoutes.REPORT,
      query: { data: JSON.stringify(paramData) },
    })
  }

  const handleChangeStatus = (
    event: SelectChangeEvent<string>,
    student_id: string
  ) => {
    let status = 0
    ATTENDANCE_STATUS.map((val, idx) => {
      if (event.target.value == val) status = idx
    })
    setStudentStatusEditedParam({
      ...recordanceParam,
      student_id: student_id,
      status_updated: status,
    })
    setShowModal(true)
  }

  const handleChangeSearchedAttendance = (
    value: undefined | StudentProps[]
  ) => {
    setSearchedAttendance(value)
  }

  const closeModalHandler = () => {
    setShowRegister(false)
    recordanceRefetch()
    setOpenSuccess(true)
  }

  const {
    status: postStatus,
    data,
    mutateAsync,
  } = useMutation(postStudentStatusEdited)
  const onSubmitHandler = (payload) => {
    const res = mutateAsync(payload, { onSuccess: () => data })
    return res
  }

  const onChangeAttendance = () => {
    onSubmitHandler(studentStatusEditedParam).then((data) => {
      if (data?.data?.success === true) {
        setOpenSuccess(true)
        setOpenFailed(false)
        setShowModal(false)
        recordanceRefetch()
      } else {
        setOpenSuccess(false)
        setOpenFailed(true)
      }
      setStudentStatusEditedParam({})
    })
  }

  const attendanceData = searchedAttendance
    ? searchedAttendance
    : sorted
    ? record?.attendance.sort((a, b) => a.status - b.status)
    : record?.attendance.sort(
        (a, b) =>
          Number(a.student_id.replace('B', '')) -
          Number(b.student_id.replace('B', ''))
      )

  if (recordStatus != 'success' || lessonStatus != 'success') {
    return <Loading />
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          onClose={() => {
            setOpenSuccess(false)
          }}
        >
          {`${t('alert.success')}`}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openFailed}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="error"
          onClose={() => {
            setOpenFailed(false)
          }}
        >
          {`${t('alert.failed')}`}
        </Alert>
      </Snackbar>
      {postStatus != 'success' && postStatus != 'idle' && <Loading />}
      <Box
        sx={{
          width: '100%',
        }}
      >
        <RegisterModal
          teacher_code={code}
          schedule_time={
            selectLecture != 'none'
              ? selectLecture
              : selectLab != 'none'
              ? selectLab
              : selectSeminar
          }
          open={showRegister}
          closeModalHandler={closeModalHandler}
        />
        <DatePanel week={week} />
        <InfoPanel
          total_sick={record?.total_sick}
          total_free={record?.total_free}
          total_absent={record?.total_absent}
          total_present={record?.total_present}
          total_students={record?.total_students}
          attendance={attendanceData}
          handleBeginRegister={handleBeginRegister}
          handleReport={handleReport}
          handleChangeSearchedAttendance={handleChangeSearchedAttendance}
        />
        <FilterPanel
          semesterWeek={week}
          lesson={lesson}
          selectSubject={selectSubject}
          selectLecture={selectLecture}
          selectSeminar={selectSeminar}
          selectLab={selectLab}
          selectWeek={selectWeek}
          handleChangeSubject={handleSelectSubject}
          handleChangeLecture={handleSelectLecture}
          handleChangeSeminar={handleSelectSeminar}
          handleChangeLab={handleSelectLab}
          handleChangeWeek={handleSelectWeek}
        />
        <RefModal
          showModal={showModal}
          closeModalHandler={() => setShowModal(false)}
          onSubmit={onChangeAttendance}
        />
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
                  {`${t('common.student_fname')}`}
                </StyledTableCell>
                <StyledTableCell
                  variant="head"
                  align="center"
                  sx={{
                    width: 200,
                    '&:hover': {
                      bgcolor: searchedAttendance
                        ? 'transparent'
                        : 'rgba(211,211,211, .3)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      cursor: searchedAttendance ? 'default' : 'pointer',
                    }}
                    onClick={() => !searchedAttendance && setSorted(!sorted)}
                  >
                    {`${t('common.status')}`}
                    {searchedAttendance ? null : sorted ? (
                      <IconArrowDropDown />
                    ) : (
                      <IconArrowDropUp />
                    )}
                  </Box>
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
              <TablePanel
                attendance={attendanceData}
                handleChangeStatus={handleChangeStatus}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
export default Main
