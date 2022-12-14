//types
export type LessonSchedule = {
  teacher_id: string
}

export type Schedule = {
  teacher_id: string
}

export type Recordance =
  | {
      teacher_id: string
      subject_id: string
      week_day: number
      part_time: number
      semester_week: number
    }
  | {}

export type Report = {
  teacher_id: string
  subject_id: string
  week_day: number
  part_time: number
}

export type StudentStatusEdited = {
  teacher_id: string
  subject_id: string
  week_day: number
  part_time: number
  student_id: string
  semester_week: number
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
  teacher_id: string
  subject_id: string
  semester_week: number
  week_day: number
  part_time: number
}

export type FilterValuesProps = {
  subject: string
  lecture: string
  seminar: string
  lab: string
  week: string
  weekDay: string
  partTime: string
}

export type RegistrationItemProps = {
  chip_number: string
  time: string
}
