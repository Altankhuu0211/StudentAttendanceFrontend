import React, { useState } from 'react'
import { Box, Typography, IconButton, TextField, Button } from '@mui/material'
import { Close as IconClose } from '@mui/icons-material'
import Colors from '@theme/colors'
import { t } from 'i18next'
import moment from 'moment'
import { RegistrationItemProps } from '@constants/types'

type Props = {
  open: boolean
  closeModalHandler: () => void
  handleRegister: (list: RegistrationItemProps[]) => void
}

const RegisterModal: React.FC<Props> = ({
  open,
  closeModalHandler,
  handleRegister,
}) => {
  const [list, setList] = useState<RegistrationItemProps[]>([])
  const [code, setCode] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (list.some((v) => v.chip_number === code)) {
    } else {
      setList([...list, { chip_number: code, time: moment().format('HH:mm') }])
    }
    setCode('')
  }

  if (!open) return null

  return (
    <>
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
            <Button
              variant="contained"
              onClick={() => handleRegister(list)}
            >{`${t('modal.register.button_text')}`}</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default RegisterModal
