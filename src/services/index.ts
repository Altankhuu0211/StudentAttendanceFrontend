import { api } from '@utils/axios'
import { URI } from '@constants/uri.constants'
import {
  Schedule,
  StudentStatusEdited,
  StudentChipNumber,
  Report,
  Recordance,
  RegistrationParams,
} from '@constants/types'

export const login = (teacherLogin) => {
  return api({
    url: URI.LOGIN,
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
  return api({ url: URI.GET_SEMESTER_WEEK })
}

export const getClassAttendanceAnalytic = () => {
  // return api({
  //   url: URI.GET_LESSON_LIST,
  //   params: { teacher_id: params.teacher_id },
  // })
  return {
    data: {
      total_free: [2, 0, 1, 0, 3, 1, 2, 0, 5], //1-16-р долоо хоног хүртэлх
      total_sick: [0, 1, 1, 2, 0, 0, 0, 3, 0],
      total_absent: [1, 2, 3, 0, 0, 0, 5, 7, 0],
      total_present: [50, 50, 48, 51, 50, 52, 46, 43, 47],
    },
  }
}

// export const getLessonSchedule = (params: LessonSchedule) => {
//   return api({
//     url: URI.GET_LESSON_LIST,
//     params: { teacher_id: params.teacher_id },
//   })
// }

export const getLessonSchedule = (params) => {
  return api({
    url: URI.GET_LESSON_LIST,
    params: params,
  })
}

export const fetchSchedule = (params: Schedule) => {
  return api({
    url: URI.GET_SCHEDULE,
    params: { teacher_id: params.teacher_id },
  })
}

export const fetchStudentList = () => {
  return api({
    url: URI.GET_STUDENTS_LIST,
  })
}

export const fetchRecordance = (params: Recordance) => {
  return api({
    url: URI.GET_CLASS_ATTENDANCE,
    params: params,
  })
}

export const fetchReport = (params: Report) => {
  return api({
    url: URI.GET_REPORT,
    params: params,
  })
}

export const postStudentStatusEdited = (params: StudentStatusEdited) => {
  return api({
    url: URI.POST_ATTENDANCE_EDITED,
    method: 'POST',
    data: JSON.stringify(params),
  })
}

export const postStudentChipNumber = (params: StudentChipNumber) => {
  return api({
    url: URI.POST_STUDENT_CHIP_NUMBER,
    method: 'POST',
    data: JSON.stringify(params),
  })
}

export const registerAttendance = (params: RegistrationParams) => {
  return api({
    url: URI.REGISTER_ATTENDANCE,
    method: 'POST',
    data: JSON.stringify(params),
  })
}
