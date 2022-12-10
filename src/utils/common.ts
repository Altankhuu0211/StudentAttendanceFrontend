import { setCookie, deleteCookie, getCookie } from 'cookies-next'

export const combineScheduleTime = (weekday: number, part_time: number) => {
  return `${weekday}-${part_time}`
}

export const setToStorage = (key: string, value) => {
  setCookie(key, value)
}

export const getFromStorage = (key: string) => {
  return getCookie(key)
}

export const deleteFromStorage = (key: string) => {
  deleteCookie(key)
}
