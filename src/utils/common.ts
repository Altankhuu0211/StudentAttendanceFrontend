export const combineScheduleTime = (weekday: number, part_time: number) => {
  return `${weekday}-${part_time}`
}

export const seperateScheduleTime = (schedule: string) => {
  const [weekDay, partTime] = schedule.split('-').map(Number)

  return {
    week_day: weekDay,
    part_time: partTime,
  }
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

export const removeFromStorage = (key) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(key)
  }
}
