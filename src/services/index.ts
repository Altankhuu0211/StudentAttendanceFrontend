import { api } from '@utils/axios'
import { URI } from '@constants/uri.constants'

export const fetchSchedule = (
  teacher_id: string // 'J.SW10'
) => {
  // return api({
  //   url: URI.GET_RECORDANCE,
  //   params: { teacher_id: teacher_id },
  // })
  return {
    data: [
      {
        weekday: 'Mon',
        subjects: [
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Лекц',
            part_time: 1,
            class_number: 225,
          },
        ],
      },
      {
        weekday: 'Tue',
        subjects: [
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Семинар',
            part_time: 1,
            class_number: 110,
          },
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Лекц',
            part_time: 6,
            class_number: 225,
          },
        ],
      },
      {
        weekday: 'Wed',
        subjects: [
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Бие даалт',
            part_time: 1,
            class_number: 117,
          },
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Лекц',
            part_time: 6,
            class_number: 225,
          },
        ],
      },
      {
        weekday: 'Thu',
        subjects: [
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Лаб',
            part_time: 2,
            class_number: 401,
          },
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Лекц',
            part_time: 6,
            class_number: 408,
          },
        ],
      },
      {
        weekday: 'Fri',
        subjects: [
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Лекц',
            part_time: 1,
            class_number: 225,
          },
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Лекц',
            part_time: 6,
            class_number: 225,
          },
        ],
      },
      {
        weekday: 'Sat',
        subjects: [
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Лекц',
            part_time: 4,
            class_number: 225,
          },
        ],
      },
      {
        weekday: 'Sun',
        subjects: [
          {
            code: 'F.CS101',
            name: 'Програмчлалын үндэс',
            class_type: 'Лекц',
            part_time: 6,
            class_number: 225,
          },
        ],
      },
    ],
  }
}

export const fetchRecordance = (params: {
  teacher_id: string // 'J.SW10'
  subject_id: string // 'F.CS101'
  class_type: string // 'Лекц'
  schedule_time: string // '4-1' (4дэх өдрийн 1-р цаг)
  date: string // '2022-10-02'
}) => {
  // return api({
  //   url: URI.GET_RECORDANCE,
  //   params: { q: params },
  // })
  return {
    data: {
      total_students: 80,
      total_absent: 10,
      total_present: 60,
      total_sick: 2,
      total_free: 8,
      attendance: [
        {
          student_id: 'B190910801',
          student_lname: 'Tamir',
          student_fname: 'Naranbaatar',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:02',
        },
        {
          student_id: 'B190910801',
          student_lname: 'Tamir',
          student_fname: 'Naranbaatar',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:02',
        },
      ],
    },
  }
}

export const fetchReport = (params: {
  teacher_id: string // 'J.SW10'
  subject_id: string // 'F.CS101'
  class_type: string // 'Лекц'
  schedule_time: string // '4-1' (4дэх өдрийн 1-р цаг)
}) => {
  // return api({
  //   url: URI.GET_RECORDANCE,
  //   params: { q: params },
  // })
  return {
    data: [
      {
        student_id: 'B190910801',
        student_lname: 'Naranbaatar',
        student_fname: 'Tamir',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          //...
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910802',
        student_lname: 'Ariunaa',
        student_fname: 'Azzaya',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 3, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          //...
          {
            week: 16,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
    ],
  }
}
