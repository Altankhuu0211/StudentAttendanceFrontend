import React, { useState } from 'react'
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { Search as IconSearch, Clear as IconClear } from '@mui/icons-material'
import Colors from '@theme/colors'
import { t } from 'i18next'
import { StudentProps } from '@constants/types'

type Props = {
  total_sick?: number
  total_free?: number
  total_absent?: number
  total_present?: number
  total_students?: number
  attendance?: StudentProps[]
  handleBeginRegister: () => void
  handleReport: () => void
  handleChangeSearchedAttendance: (v: undefined | StudentProps[]) => void
}

const InfoPanel: React.FC<Props> = ({
  total_sick,
  total_free,
  total_absent,
  total_present,
  total_students,
  attendance,
  handleBeginRegister,
  handleReport,
  handleChangeSearchedAttendance,
}) => {
  const [searchText, setSearchText] = useState('')
  const [showClearIcon, setShowClearIcon] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value)
    if (event.target.value === '') {
      setShowClearIcon(false)
      handleChangeSearchedAttendance(undefined)
    } else setShowClearIcon(true)
  }

  const handleClear = () => {
    setSearchText('')
    handleChangeSearchedAttendance(undefined)
  }

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleChangeSearchedAttendance(
      attendance &&
        attendance.filter(
          (v) =>
            v.student_id.includes(searchText) || v.fullname.includes(searchText)
        )
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        p: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        color: Colors.mainWhite,
        borderRight: '1px solid black',
        borderLeft: '1px solid black',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '50%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            border: '1px solid black',
            height: 70,
          }}
        >
          <Typography variant="body2" sx={{ color: Colors.mainBlack }}>
            {`${t('common.total_student')}`}: {total_students || ''}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            height: 70,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: Colors.others,
              whiteSpace: 'pre-line',
              textAlign: 'center',
            }}
          >
            {`${t('common.others')}`}: {Number(total_sick) + Number(total_free)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            borderLeft: '1px solid black',
            height: 70,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: Colors.absent,
              whiteSpace: 'pre-line',
              textAlign: 'center',
            }}
          >
            {`${t('common.absent')}`}: {total_absent}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            border: '1px solid black',
            height: 70,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: Colors.present,
              whiteSpace: 'pre-line',
              textAlign: 'center',
            }}
          >
            {`${t('common.present')}`}: {total_present}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{ mr: 2, bgcolor: Colors.btn }}
            onClick={handleBeginRegister}
          >
            {`${t('common.start')}`}
          </Button>
          <Button variant="contained" onClick={handleReport}>
            {`${t('common.report')}`}
          </Button>
        </Box>
        <Box component="form" onSubmit={onSearch} sx={{ width: '100%' }}>
          <TextField
            size="small"
            variant="outlined"
            onChange={handleChange}
            value={searchText}
            placeholder={`${t('common.search')}`}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  style={{
                    display: showClearIcon ? 'flex' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={handleClear}
                >
                  <IconClear />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
export default InfoPanel
