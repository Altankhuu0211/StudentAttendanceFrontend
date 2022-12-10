import { CookieValueTypes } from 'cookies-next'

//types
export type LessonSchedule = {
  teacher_id: CookieValueTypes
}

export type Schedule = {
  teacher_id: CookieValueTypes
}

export type Recordance = {
  teacher_id: CookieValueTypes
  subject_id: string
  week_day: number
  part_time: number
  semester_week: number
}

export type Report = {
  teacher_id: string // 'J.SW10'
  subject_id: string // 'F.CS101'
  class_type: string // 'Лекц'
  schedule_time: string // '4-1'
}

export type StudentStatusEdited = {
  teacher_id: string // 'J.SW10'
  subject_id: string // 'F.CS101'
  class_type: string // 'Лекц'
  schedule_time: string // '1-4'
  semester_week: number // 14
  student_id: string // 'B190910001'
  status_updated: number // 0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
}

export type StudentChipNumber = {
  student_id: string // 'B190910801'
  chip_number: string // '011201230'
}

export type LessonProps = {
  id: string
  name: string
  laborator: string[] | []
  lecture: string[] | []
  seminar: string[] | []
}

export type LessonsProps = LessonProps[] | []

export type StudentProps = {
  status: number
  student_fname: string
  student_id: string
  student_lname: string
  time: null | string
  updated_at: string
}

export type RecordanceProps = {
  attendance: StudentProps[]
  total_absent: number
  total_free: number
  total_present: number
  total_sick: number
  total_students: number
}

export type RecordanceParamProps = {
  teacher_id: CookieValueTypes
  subject_id: string
  semester_week: number
  week_day: number
  part_time: number
}
