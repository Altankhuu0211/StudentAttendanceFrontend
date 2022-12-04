//types
export type LessonSchedule = {
  teacher_id: string // 'J.SW10'
}

export type Schedule = {
  teacher_id: string | null | undefined // 'J.SW10'
}

export type Recordance = {
  teacher_id: string // 'J.SW10'
  subject_id: string // 'F.CS101'
  class_type: string // 'Лекц'
  schedule_time: string // '2-3'
  semester_week: number // 7
}

export type Report = {
  teacher_id: string // 'J.SW10'
  subject_id: string // 'F.CS101'
  class_type: string // 'Лекц'
  schedule_time: string // '4-1' (4дэх өдрийн 1-р цаг)
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
