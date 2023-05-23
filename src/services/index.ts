import { api } from '@utils/axios'
import { URI } from '@constants/uri.constants'
import {
  StudentStatusEdited,
  StudentChipNumber,
  Report,
  Recordance,
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

// export const getClassAttendanceAnalytic = () => {
//   return {
//     data: {
//       total_free: [2, 0, 1, 0, 3, 1, 2, 0, 5], //1-16-р долоо хоног хүртэлх
//       total_sick: [0, 1, 1, 2, 0, 0, 0, 3, 0],
//       total_absent: [1, 2, 3, 0, 0, 0, 5, 7, 0],
//       total_present: [50, 50, 48, 51, 50, 52, 46, 43, 47],
//     },
//   }
// }

// export const getLessonSchedule = (params: LessonSchedule) => {
//   return api({
//     url: URI.GET_LESSON_LIST,
//     params: { teacher_id: params.teacher_id },
//   })
// }

// export const getPar = (usercode) => {
//   const data = await api.service("teacher_lesson").find({ query: { user_code: usercode }});

//   data = [
//     { user_code: "J.SW010", lesson_code: "F.CS310" },
//       { user_code: "J.SW010", lesson_code: "F.CS310" },
//         { user_code: "J.SW010", lesson_code: "F.CS310" },
//           { user_code: "J.SW010", lesson_code: "F.CS310" },
//   ];

//   const lesson_names = await api.service("lessons").find({ query: { $in: data.map(item => { return data.lesson_code }) }})

//   return lessons_data;
// }

export const getLessonSchedule = (params) => {
  return api({
    // url: URI.GET_LESSON_LIST,
    url: `${root}/teacher-lessons`,
    params: params,
  })
}

export const fetchSchedule = (params) => {
  return api({
    // url: URI.GET_SCHEDULE,
    url: `${root}/teacher-schedule`,
    params: params,
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
    params: params,
  })
}

export const fetchReport = (params: Report) => {
  return api({
    // url: URI.GET_REPORT,
    url: `${root}/class-report`,
    params: params,
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
