import React from 'react'
import { Box, Typography } from '@mui/material'
import Colors from '@theme/colors'
import moment from 'moment'

type Props = {
  week: string
}

const DatePanel: React.FC<Props> = ({ week }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: Colors.secondary,
        color: Colors.mainWhite,
        border: '1px solid black',
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
          {`Хичээлийн ${week}-р долоо хоног`}
        </Typography>
      </Box>
    </Box>
  )
}
export default DatePanel
