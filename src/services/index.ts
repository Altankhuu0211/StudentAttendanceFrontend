import { api } from '@utils/axios'
import { URI } from '@constants/uri.constants'
import {
  Schedule,
  LessonSchedule,
  Recordance,
  StudentStatusEdited,
  Report,
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
  // return api({ url: URI.GET_SEMESTER_WEEK })
  return 13
}

export const getLessonSchedule = (params: LessonSchedule) => {
  // return api({
  //   url: URI.GET_LESSON_LIST,
  //   params: { teacher_id: params.teacher_id },
  // })
  return {
    data: [
      {
        id: 'F.CS101',
        name: 'Програмчлалын үндэс',
        lecture: ['2-5'],
        seminar: [],
        laborator: ['1-4', '1-5', '2-2'],
      },
      {
        id: 'F.CS102',
        name: 'Алгоритмын үндэс',
        lecture: ['2-6'],
        seminar: ['1-3'],
        laborator: ['3-4', '3-5'],
      },
      {
        id: 'F.CS103',
        name: 'Инженерийн эдийн засаг',
        lecture: ['2-7'],
        seminar: [],
        laborator: ['1-1', '1-2'],
      },
      {
        id: 'F.CS104',
        name: 'Дискрет бүтэц',
        lecture: ['4-1'],
        seminar: ['2-3'],
        laborator: ['5-1', '5-2'],
      },
    ],
  }
}

export const fetchSchedule = (params: Schedule) => {
  return api({
    url: URI.GET_SCHEDULE,
    params: { teacher_id: params.teacher_id },
  })
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

export const fetchStudentList = () => {
  // return api({
  //   url: URI.GET_STUDENTS_LIST,
  // })
  return {
    data: [
      {
        student_id: 'B190910001',
        student_lname: 'Naranbaatar',
        student_fname: 'Tamir',
        chip_number: '0100010435',
      },
      {
        student_id: 'B190910002',
        student_lname: 'Bold',
        student_fname: 'Hulan',
        chip_number: '0100010435',
      },
      {
        student_id: 'B190910003',
        student_lname: 'Ulammandakh',
        student_fname: 'Bilguun',
        chip_number: '',
      },
      {
        student_id: 'B190910004',
        student_lname: 'Batzorig',
        student_fname: 'Huslen',
        chip_number: '',
      },
      {
        student_id: 'B190910805',
        student_lname: 'Bathuleg',
        student_fname: 'Haliunaa',
        chip_number: '',
      },
      {
        student_id: 'B190910806',
        student_lname: 'Bayartogtoh',
        student_fname: 'Bilguun',
        chip_number: '',
      },
      {
        student_id: 'B190910807',
        student_lname: 'Tuguldur',
        student_fname: 'Bayaraa',
        chip_number: '',
      },
      {
        student_id: 'B190910808',
        student_lname: 'Nomundalai',
        student_fname: 'Nomin',
        chip_number: '0100010450',
      },
      {
        student_id: 'B190910809',
        student_lname: 'Boldsuren',
        student_fname: 'Purevdorj',
        chip_number: '0100010801',
      },
      {
        student_id: 'B190910810',
        student_lname: 'Bat-Orshih',
        student_fname: 'Temuulen',
        chip_number: '0100010720',
      },
      {
        student_id: 'B190910811',
        student_lname: 'Tumen-Ulzii',
        student_fname: 'Gantugs',
        chip_number: '',
      },
      {
        student_id: 'B190910812',
        student_lname: 'Bayarmunkh',
        student_fname: 'Temuulen',
        chip_number: '',
      },
      {
        student_id: 'B190910813',
        student_lname: 'Bilegjargal',
        student_fname: 'Khulan',
        chip_number: '',
      },
      {
        student_id: 'B190910814',
        student_lname: 'Saihantur',
        student_fname: 'Sarnai',
        chip_number: '',
      },
      {
        student_id: 'B190910820',
        student_lname: 'Jargalsaihan',
        student_fname: 'Enerel',
        chip_number: '',
      },
      {
        student_id: 'B190910001',
        student_lname: 'Naranbaatar',
        student_fname: 'Tamir',
        chip_number: '0100010435',
      },
      {
        student_id: 'B190910002',
        student_lname: 'Bold',
        student_fname: 'Hulan',
        chip_number: '0100010435',
      },
      {
        student_id: 'B190910003',
        student_lname: 'Ulammandakh',
        student_fname: 'Bilguun',
        chip_number: '',
      },
      {
        student_id: 'B190910004',
        student_lname: 'Batzorig',
        student_fname: 'Huslen',
        chip_number: '',
      },
      {
        student_id: 'B190910805',
        student_lname: 'Bathuleg',
        student_fname: 'Haliunaa',
        chip_number: '',
      },
      {
        student_id: 'B190910806',
        student_lname: 'Bayartogtoh',
        student_fname: 'Bilguun',
        chip_number: '',
      },
      {
        student_id: 'B190910807',
        student_lname: 'Tuguldur',
        student_fname: 'Bayaraa',
        chip_number: '',
      },
      {
        student_id: 'B190910808',
        student_lname: 'Nomundalai',
        student_fname: 'Nomin',
        chip_number: '0100010450',
      },
      {
        student_id: 'B190910809',
        student_lname: 'Boldsuren',
        student_fname: 'Purevdorj',
        chip_number: '0100010801',
      },
      {
        student_id: 'B190910810',
        student_lname: 'Bat-Orshih',
        student_fname: 'Temuulen',
        chip_number: '0100010720',
      },
      {
        student_id: 'B190910811',
        student_lname: 'Tumen-Ulzii',
        student_fname: 'Gantugs',
        chip_number: '',
      },
      {
        student_id: 'B190910812',
        student_lname: 'Bayarmunkh',
        student_fname: 'Temuulen',
        chip_number: '',
      },
      {
        student_id: 'B190910813',
        student_lname: 'Bilegjargal',
        student_fname: 'Khulan',
        chip_number: '',
      },
      {
        student_id: 'B190910814',
        student_lname: 'Saihantur',
        student_fname: 'Sarnai',
        chip_number: '',
      },
      {
        student_id: 'B190910820',
        student_lname: 'Jargalsaihan',
        student_fname: 'Enerel',
        chip_number: '',
      },
    ],
  }
}

export const fetchRecordance = (params: Recordance) => {
  // return api({
  //   url: URI.GET_RECORDANCE,
  //   params: { q: params },
  // })
  return {
    data: {
      date: '2022-11-24',
      total_students: 80,
      total_absent: 10,
      total_present: 60,
      total_sick: 2,
      total_free: 8,
      attendance: [
        {
          student_id: 'B190910001',
          student_lname: 'Naranbaatar',
          student_fname: 'Tamir',
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:02',
        },
        {
          student_id: 'B190910002',
          student_lname: 'Bold',
          student_fname: 'Hulan',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:02',
        },
        {
          student_id: 'B190910003',
          student_lname: 'Ulammandakh',
          student_fname: 'Bilguun',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:02',
        },
        {
          student_id: 'B190910004',
          student_lname: 'Batzorig',
          student_fname: 'Huslen',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:05',
        },
        {
          student_id: 'B190910805',
          student_lname: 'Bathuleg',
          student_fname: 'Haliunaa',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:05',
        },
        {
          student_id: 'B190910806',
          student_lname: 'Bayartogtoh',
          student_fname: 'Bilguun',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:05',
        },
        {
          student_id: 'B190910807',
          student_lname: 'Tuguldur',
          student_fname: 'Bayaraa',
          status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:05',
        },
        {
          student_id: 'B190910808',
          student_lname: 'Nomundalai',
          student_fname: 'Nomin',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:05',
        },
        {
          student_id: 'B190910809',
          student_lname: 'Boldsuren',
          student_fname: 'Purevdorj',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:05',
        },
        {
          student_id: 'B190910810',
          student_lname: 'Bat-Orshih',
          student_fname: 'Temuulen',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:06',
        },
        {
          student_id: 'B190910811',
          student_lname: 'Tumen-Ulzii',
          student_fname: 'Gantugs',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:06',
        },
        {
          student_id: 'B190910812',
          student_lname: 'Bayarmunkh',
          student_fname: 'Temuulen',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:07',
        },
        {
          student_id: 'B190910813',
          student_lname: 'Bilegjargal',
          student_fname: 'Khulan',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:07',
        },
        {
          student_id: 'B190910814',
          student_lname: 'Saihantur',
          student_fname: 'Sarnai',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:10',
        },
        {
          student_id: 'B190910820',
          student_lname: 'Jargalsaihan',
          student_fname: 'Enerel',
          status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          time: '08:10',
        },
      ],
    },
  }
}

export const fetchReport = (params: Report) => {
  // return api({
  //   url: URI.GET_REPORT,
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
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910802',
        student_lname: 'Dorj',
        student_fname: 'Temuulen',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910005',
        student_lname: 'Damdinsuren',
        student_fname: 'Huslen',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910810',
        student_lname: 'Bilguun',
        student_fname: 'Hishigdalai',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910010',
        student_lname: 'Battulga',
        student_fname: 'Bayarmaa',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910020',
        student_lname: 'Batmagnai',
        student_fname: 'Tumenhuslen',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910021',
        student_lname: 'Bayarbileg',
        student_fname: 'Saruulzaya',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910808',
        student_lname: 'Battushig',
        student_fname: 'Delger',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910100',
        student_lname: 'Gantuguldur',
        student_fname: 'Bayarjavhlan',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910810',
        student_lname: 'Bilguun',
        student_fname: 'Batdorj',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910030',
        student_lname: 'Saruul-Erdem',
        student_fname: 'Bolormaa',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
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
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910802',
        student_lname: 'Dorj',
        student_fname: 'Temuulen',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910005',
        student_lname: 'Damdinsuren',
        student_fname: 'Huslen',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910810',
        student_lname: 'Bilguun',
        student_fname: 'Hishigdalai',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910010',
        student_lname: 'Battulga',
        student_fname: 'Bayarmaa',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910020',
        student_lname: 'Batmagnai',
        student_fname: 'Tumenhuslen',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910021',
        student_lname: 'Bayarbileg',
        student_fname: 'Saruulzaya',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910808',
        student_lname: 'Battushig',
        student_fname: 'Delger',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910100',
        student_lname: 'Gantuguldur',
        student_fname: 'Bayarjavhlan',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910810',
        student_lname: 'Bilguun',
        student_fname: 'Batdorj',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 0, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
      {
        student_id: 'B190910030',
        student_lname: 'Saruul-Erdem',
        student_fname: 'Bolormaa',
        attendance: [
          {
            week: 1,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 2,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 3,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 4,
            status: 2, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 5,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 6,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 7,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 8,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 9,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 10,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 11,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 12,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 13,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 14,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 15,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
          {
            week: 16,
            status: 1, //0-ирээгүй, 1-ирсэн, 2-чөлөөтэй, 3-өвчтэй
          },
        ],
      },
    ],
  }
}

export const postStudentStatusEdited = (params: StudentStatusEdited) => {
  return api({
    url: URI.POST_ATTENDANCE_EDITED,
    method: 'POST',
    data: JSON.stringify(params),
  })
}
