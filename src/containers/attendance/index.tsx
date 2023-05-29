import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getFromStorage } from '@utils/common'
import { getSemesterWeek } from '@services/index'

import Main from './partials/Main'
import Loading from '@components/Loading'

const RecordAttendanceContainer: React.FC<{}> = () => {
  const [teacherCode, setTeacherCode] = useState<string>('')
  const [week, setWeek] = useState<string>('')

  useEffect(() => {
    setTeacherCode(getFromStorage('user_code') || '')
  }, [])

  const { status: _weekStatus, data: weekData } = useQuery(
    'semester-week',
    () => {
      return getSemesterWeek()
    }
  )

  useEffect(() => {
    if (weekData) {
      setWeek(weekData?.data?.data)
    }
  }, [weekData])

  return (
    <>
      {teacherCode && week ? (
        <Main code={teacherCode} week={week} />
      ) : (
        <Loading />
      )}
    </>
  )
}

export default RecordAttendanceContainer
