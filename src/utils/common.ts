export const combineScheduleTime = (part_time: number, weekday: number) => {
  return `${part_time}-${weekday}`
}

export const setToStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value)
  }
}

export const getFromStorage = (key) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key)
  }
}
