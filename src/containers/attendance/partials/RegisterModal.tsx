import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Alert,
  Snackbar,
} from '@mui/material'
import { useQuery } from 'react-query'
import { useMutation } from 'react-query'
import { Close as IconClose } from '@mui/icons-material'
import Colors from '@theme/colors'
import { t } from 'i18next'
import { RegistrationItemProps } from '@constants/types'
import { fetchSchedule, registerAttendance } from '@services/index'
import Loading from '@components/Loading'
import _ from 'lodash'

type Props = {
  teacher_code: string
  schedule_time: string
  open: boolean
  closeModalHandler: () => void
}

const RegisterModal: React.FC<Props> = ({
  teacher_code,
  schedule_time,
  open,
  closeModalHandler,
}) => {
  const [list, setList] = useState<RegistrationItemProps[]>([])
  const [code, setCode] = useState('')
  const [rfid, setRfid] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailed, setOpenFailed] = useState(false)

  const { status: scheduleStatus, data: scheduleData } = useQuery(
    ['schedule', teacher_code],
    () => {
      return fetchSchedule({ teacher_id: teacher_code })
    }
  )

  const {
    status: registerStatus,
    data,
    mutateAsync,
  } = useMutation(registerAttendance)
  const onSubmitHandler = (payload) => {
    const res = mutateAsync(payload, { onSuccess: () => data })
    return res
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const [week_day, parttime] = _.split(schedule_time, '-', 2)
    scheduleData?.data?.data.map((val) => {
      if (val.weekday == week_day) {
        val.Subjects.map((i) => {
          if (i.part_time == parttime) {
            setRfid(i.class_number)
          }
        })
      }
    })
    if (list.some((v) => v.chip_number === code)) {
    } else {
      setList([...list, { chip_number: code }])
    }
    setCode('')
  }

  const onSubmitRegister = () => {
    const payload = {
      date: '2022-10-25',
      time: '08:39:46',
      rfid_no: rfid,
      attendance: list,
    }
    onSubmitHandler(payload).then((data) => {
      if (data?.data?.success === true) {
        setOpenSuccess(true)
        setOpenFailed(false)
        closeModalHandler()
        setList([])
      } else {
        setOpenSuccess(false)
        setOpenFailed(true)
      }
    })
  }

  if (scheduleStatus != 'success') {
    return <Loading />
  }

  if (!open) return null

  return (
    <>
      {registerStatus != 'success' && registerStatus != 'idle' && <Loading />}
      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          onClose={() => {
            setOpenSuccess(false)
          }}
        >
          {`${t('alert.success')}`}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openFailed}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="error"
          onClose={() => {
            setOpenFailed(false)
          }}
        >
          {`${t('alert.failed')}`}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: '5',
        }}
      />
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 570,
          height: 422,
          backgroundColor: Colors.mainWhite,
          borderRadius: '5px',
          zIndex: '6',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 1, mt: 1 }}>
          <IconButton
            onClick={() => {
              closeModalHandler()
              setList([])
            }}
          >
            <IconClose sx={{ color: Colors.mainBlack }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            height: 'calc(100% - 60px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 4, sm: 8, md: 14 },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: Colors.secondBlue,
              fontSize: '20px',
              textAlign: 'center',
            }}
          >
            {`${t('modal.register.guide')}`}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: Colors.secondBlue,
              fontSize: '20px',
              textAlign: 'center',
              mt: 3,
            }}
          >
            {`${t('modal.register.info_1')} ${list.length} ${t(
              'modal.register.info_2'
            )}`}
          </Typography>

          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <TextField
              autoFocus
              onBlur={({ target }) => target.focus()}
              hiddenLabel
              size="small"
              value={code}
              onChange={handleChange}
              sx={{ mt: 5, mb: 1 }}
            />
            <Button variant="contained" onClick={onSubmitRegister}>{`${t(
              'modal.register.button_text'
            )}`}</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default RegisterModal
