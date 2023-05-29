import { api } from '@utils/axios'
import { URI } from '@constants/uri.constants'
import {
  StudentStatusEdited,
  StudentChipNumber,
  Report,
  Recordance,
  GetAnalyticsDataParam,
  // RegistrationParams,
} from '@constants/types'
import app from '@utils/feathers_client'
import { root } from '@constants/routes.constants'

export const login = (teacherLogin) => {
  return api({
    // url: URI.LOGIN,
    url: `${root}/login`,
    method: 'POST',
    data: JSON.stringify(teacherLogin),
  })
}

export const logout = () => {
  return api({
    url: URI.LOGOUT,
    method: 'POST',
  })
}

export const getSemesterWeek = () => {
  return api({
    // url: URI.GET_SEMESTER_WEEK
    url: `${root}/semester-week`,
  })
}

export const getAnalytics = (params) => {
  return api({
    // url: URI.GET_SEMESTER_WEEK
    url: `${root}/analytics`,
    params: params,
  })
}

export const getLessonSchedule = (params) => {
  return api({
    // url: URI.GET_LESSON_LIST,
    url: `${root}/teacher-lessons`,
    params,
  })
}

export const fetchSchedule = (params) => {
  return api({
    // url: URI.GET_SCHEDULE,
    url: `${root}/teacher-schedule`,
    params,
  })
}

export const fetchStudentList = async () => {
  var count = 0
  var data: any = []
  while (count < 500) {
    const unit: any = await app.service('users').find({
      query: {
        permission: 'student',
        $limit: 50,
        $skip: count,
        $sort: { id: 1 },
      },
    })
    count = count + 50
    data = [...data, ...unit.data]
  }

  return data
  // return api({
  //   url: URI.GET_STUDENTS_LIST,
  // })
}

export const fetchRecordance = (params: Recordance) => {
  return api({
    // url: URI.GET_CLASS_ATTENDANCE,
    url: `${root}/class-attendance`,
    params,
  })
}

export const fetchReport = (params: Report) => {
  return api({
    // url: URI.GET_REPORT,
    url: `${root}/class-report`,
    params,
  })
}

export const postStudentStatusEdited = (params: StudentStatusEdited) => {
  return api({
    // url: URI.POST_ATTENDANCE_EDITED,
    url: `${root}/class-attendance`,
    method: 'POST',
    data: JSON.stringify(params),
  })
}

export const postStudentChipNumber = (params: StudentChipNumber) => {
  return api({
    // url: URI.POST_STUDENT_CHIP_NUMBER,
    url: `${root}/student-card`,
    method: 'POST',
    data: JSON.stringify(params),
  })
}

export const registerAttendance = (params) => {
  return api({
    // url: URI.REGISTER_ATTENDANCE,
    url: `${root}/record-attendance`,
    method: 'POST',
    data: JSON.stringify(params),
  })
}

export const getAnalyticsData = (params: GetAnalyticsDataParam) => {
  return api({
    url: `${root}/analytics`,
    method: 'GET',
    params,
  })
}
