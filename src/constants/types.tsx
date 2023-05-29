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
      subject_id?: string
      week_day: number
      part_time: number
      semester_week: number
    }
  | {}

export type Report =
  | {
      teacher_id: string
      subject_id: string
      week_day: number
      part_time: number
    }
  | {}

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
  student_id: string
  fullname: string
  arrival_time: null | string
  updated_at: string
}

export type FormProps = {
  fullname: string
  id: string
  card_number: string
}

export type ReportProps = {
  student_id: string
  fullname: string
  attendance: any
  total_attendance: number
}

export type ReportParamProps = {
  teacher_id: string
  subject_id: string
  week_day: number
  part_time: number
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
}

export type RegistrationParams = {
  date: string
  time: string
  rfid_no: string
  attendance: RegistrationItemProps[]
}

export type GetAnalyticsDataParam = {
  teacher_id: string
  week_day: number
  part_time: number
}
