const DOMAIN = process.env.NEXT_PUBLIC_API

export const URI = {
  DOMAIN,
  LOGIN: '/user/login',
  LOGOUT: '/user/logout',
  GET_CLASS_ATTENDANCE: '/teacher/class-attendance',
  GET_SCHEDULE: '/teacher/schedule',
  GET_LESSON_LIST: '/teacher/classes',
  GET_REPORT: '/teacher/class-attendance-report',
  GET_SEMESTER_WEEK: '/teacher/semester-week',
  POST_ATTENDANCE_EDITED: '/teacher/attendance-edited',
}
