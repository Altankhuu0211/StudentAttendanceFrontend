import React from 'react'
import _ from 'lodash'
import { useQuery } from 'react-query'
import moment from 'moment'

// components
import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import Loading from '@components/Loading'

// constants
import { PART_TIME, WEEKDAY, CLASS_TYPE } from '@constants/common'
import { useRouter } from 'next/router'
import { fetchSchedule } from '@services/index'

type Props = {}

const ScheduleContainer: React.FC<Props> = () => {
  const router = useRouter()

  const { status: scheduleStatus, data: scheduleData } = useQuery(
    ['teacher-schedule', 'J.SW10'],
    () => {
      return fetchSchedule('J.SW10')
    }
  )

  if (scheduleStatus != 'success') {
    return <Loading />
  }

  const response = scheduleData?.data

  const handleSubjectClick = (subject: any) => {
    console.log(subject)
    router.push('/screen-2')
  }

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      border: '1px solid black',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      border: '1px solid black',
    },
  }))

  const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(even)': {
      backgroundColor: '#EEEEF7',
    },
  }))
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          maxWidth: 1200,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: '#305497',
            color: 'white',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {moment().format('ll')}
            </Typography>
            <Typography variant="body2">
              Хичээлийн 7 дугаар долоо хоног
            </Typography>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="caption table" sx={{ width: 1200 }}>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell variant="head" align="center">
                  Хичээлийн цаг
                </StyledTableCell>
                {WEEKDAY.map((v, i) => {
                  return (
                    <StyledTableCell
                      key={i}
                      variant="head"
                      align="center"
                      sx={{ bgcolor: '#305497', color: 'white' }}
                    >
                      {v.name}
                    </StyledTableCell>
                  )
                })}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {PART_TIME.map((v, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell align="center">{`${v.number}-р цаг: ${v.time_interval}`}</StyledTableCell>
                  {_.range(0, 7).map((_val, idx) => {
                    return (
                      <StyledTableCell align="center">
                        {response[idx]?.subjects.map((subject, index) => {
                          return (
                            subject.part_time === v.number && (
                              <Box
                                key={index}
                                onClick={() => handleSubjectClick(subject)}
                                sx={{
                                  bgcolor: CLASS_TYPE.map((va) => {
                                    return va.type === subject.class_type
                                      ? va.color
                                      : null
                                  }),
                                  m: '-16px',
                                  cursor: 'pointer',
                                  opacity: 1,
                                  transition: '0.3s',
                                  '&:hover': {
                                    opacity: 0.7,
                                  },
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {subject.code}
                                </Typography>
                                <Typography variant="body2">
                                  {subject.name}
                                </Typography>
                                <Typography variant="body2">
                                  {subject.class_type} №{subject.class_number}
                                </Typography>
                              </Box>
                            )
                          )
                        })}
                      </StyledTableCell>
                    )
                  })}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', mt: 2, justifyContent: 'flex-end' }}>
          {CLASS_TYPE.map((value) => {
            return (
              <Box
                sx={{
                  bgcolor: value.color,
                  width: 150,
                  height: 50,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid black',
                  ml: 2,
                  textAlign: 'center',
                  fontSize: 14,
                }}
              >
                {`${value.type}ын цагууд`}
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default ScheduleContainer
