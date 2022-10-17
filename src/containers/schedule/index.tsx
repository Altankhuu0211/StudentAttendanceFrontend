import React from 'react'

// components
import { Container, Box } from '@mui/material'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material'

type Props = {}

const ScheduleContainer: React.FC<Props> = () => {
  const students = [
    {
      name: 'Ариунболор Болдсайхан',
      id: 'B190910800',
      state: 'ирсэн',
      time: '08:15',
      note: '',
    },
    {
      name: 'Ариунболор Болдсайхан',
      id: 'B190910800',
      state: 'ирсэн',
      time: '08:15',
      note: '',
    },
    {
      name: 'Ариунболор Болдсайхан',
      id: 'B190910800',
      state: 'ирсэн',
      time: '08:15',
      note: '',
    },
    {
      name: 'Ариунболор Болдсайхан',
      id: 'B190910800',
      state: 'ирсэн',
      time: '08:15',
      note: '',
    },
    {
      name: 'Ариунболор Болдсайхан',
      id: 'B190910800',
      state: 'ирсэн',
      time: '08:15',
      note: '',
    },
    {
      name: 'Ариунболор Болдсайхан',
      id: 'B190910800',
      state: 'ирсэн',
      time: '08:15',
      note: '',
    },
    {
      name: 'Ариунболор Болдсайхан',
      id: 'B190910800',
      state: 'ирсэн',
      time: '08:15',
      note: '',
    },
    {
      name: 'Bold',
      id: 'B190910800',
      state: 'ирсэн',
      time: '08:15',
      note: '',
    },
  ]
  return (
    <>
      <Container maxWidth="lg">
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              <TableCell variant="head">№</TableCell>
              <TableCell variant="head">Оюутны код</TableCell>
              <TableCell variant="head">Оюутны нэр</TableCell>
              <TableCell variant="head">Төлөв</TableCell>
              <TableCell variant="head">Цаг</TableCell>
              <TableCell variant="head">Тэмдэглэл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell align="left">{idx + 1}</TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <Box
                    sx={{
                      width: 100,
                      px: 2,
                      py: 0.5,
                      borderRadius: '8px',
                      border: `1px solid green`,
                    }}
                  >
                    {row.state}
                  </Box>
                </TableCell>
                <TableCell align="left">{row.time}</TableCell>
                <TableCell align="left">{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  )
}

export default ScheduleContainer
