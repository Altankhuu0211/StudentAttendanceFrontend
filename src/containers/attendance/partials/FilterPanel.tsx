import React from 'react'
import { Box, MenuItem, Select } from '@mui/material'
import { t } from 'i18next'
import _ from 'lodash'
import Colors from '@theme/colors'
import { SEMESTER_WEEK } from '@constants/common'
import { LessonsProps } from '@constants/types'
import Loading from '@components/Loading'

type Props = {
  semesterWeek: string
  lesson: LessonsProps
  selectSubject: string
  selectLecture: string
  selectSeminar: string
  selectLab: string
  selectWeek: string
  handleChangeSubject: (e) => void
  handleChangeLecture: (e) => void
  handleChangeSeminar: (e) => void
  handleChangeLab: (e) => void
  handleChangeWeek: (e) => void
}

const FilterPanel: React.FC<Props> = ({
  semesterWeek,
  lesson,
  selectSubject,
  selectLecture,
  selectSeminar,
  selectLab,
  selectWeek,
  handleChangeSubject,
  handleChangeLecture,
  handleChangeSeminar,
  handleChangeLab,
  handleChangeWeek,
}) => {
  if (_.isEmpty(semesterWeek) && _.isEmpty(lesson)) {
    return <Loading />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        color: Colors.mainWhite,
        borderTop: '1px solid black',
        borderRight: '1px solid black',
        borderLeft: '1px solid black',
        overflowX: 'scroll',
      }}
    >
      <Select
        value={selectSubject}
        onChange={handleChangeSubject}
        fullWidth
        sx={{
          mr: 1.5,
          fontWeight: selectSubject != 'none' ? 700 : 400,
          color: selectSubject != 'none' ? 'black' : 'grey',
        }}
      >
        <MenuItem value="none" disabled>
          {`${t('selection.lesson')}`}
        </MenuItem>
        {lesson.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          )
        })}
      </Select>
      <Select
        value={selectLecture}
        onChange={handleChangeLecture}
        fullWidth
        sx={{
          mr: 1.5,
          fontWeight: selectLecture != 'none' ? 700 : 400,
          color: selectLecture != 'none' ? 'black' : 'grey',
        }}
      >
        <MenuItem value="none" disabled>
          {`${t('selection.lecture')}`}
        </MenuItem>
        {lesson.map((item) => {
          if (item.id == selectSubject)
            return item.lecture.map((val) => {
              return (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              )
            })
        })}
      </Select>
      <Select
        value={selectSeminar}
        onChange={handleChangeSeminar}
        fullWidth
        sx={{
          mr: 1.5,
          fontWeight: selectSeminar != 'none' ? 700 : 400,
          color: selectSeminar != 'none' ? 'black' : 'grey',
        }}
      >
        <MenuItem value="none" disabled>
          {`${t('selection.seminar')}`}
        </MenuItem>
        {lesson &&
          lesson.map((item) => {
            if (item.id == selectSubject)
              return item.seminar.map((val) => {
                return (
                  <MenuItem key={val} value={val}>
                    {val}
                  </MenuItem>
                )
              })
          })}
      </Select>
      <Select
        value={selectLab}
        onChange={handleChangeLab}
        fullWidth
        sx={{
          mr: 1.5,
          fontWeight: selectLab != 'none' ? 700 : 400,
          color: selectLab != 'none' ? 'black' : 'grey',
        }}
      >
        <MenuItem value="none" disabled>
          {`${t('selection.laborator')}`}
        </MenuItem>
        {lesson.map((item) => {
          if (item.id == selectSubject)
            return item.laborator.map((val) => {
              return (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              )
            })
        })}
      </Select>
      <Select
        value={selectWeek}
        onChange={handleChangeWeek}
        fullWidth
        sx={{
          mr: 1.5,
          fontWeight: selectWeek != '0' ? 700 : 400,
          color: selectWeek != '0' ? 'black' : 'grey',
        }}
      >
        <MenuItem value="0" disabled>
          {`${t('selection.semester_week')}`}
        </MenuItem>
        {SEMESTER_WEEK.map((item, idx) => {
          return (
            <MenuItem key={idx + 1} value={String(idx + 1)}>
              {item}
            </MenuItem>
          )
        })}
      </Select>
    </Box>
  )
}
export default FilterPanel
