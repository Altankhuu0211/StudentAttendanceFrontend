import React, { useState } from 'react'
import Colors from '@theme/colors'
import { t } from 'i18next'
import _ from 'lodash'

// components
import {
  Box,
  Typography,
  Divider,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material'
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material'
import useLoginValidation from './useLoginValidation'
import useLogin from './useLogin'
import { FieldValues } from 'react-hook-form'
import { useRouter } from 'next/router'
import { PageRoutes } from '@constants/routes.constants'
import { setToStorage } from '@utils/common'

type Props = {}

const LoginContainer: React.FC<Props> = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailed, setOpenFailed] = useState(false)
  const { Controller, methods } = useLoginValidation()
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods
  const { onSubmitHandler } = useLogin()
  const onSubmit = () => {
    router.push(PageRoutes.HOME)
    onSubmitHandler(getValues()).then((data) => {
      console.log('data:', data)
      if (data?.status == 200) {
        setOpenSuccess(true)
        router.push(PageRoutes.HOME)
        // const localStorage = require('localStorage'),
        // authorization = { token: data.headers.authorization }
        // localStorage.setItem('token', JSON.stringify(authorization))
      } else {
        setOpenFailed(true)
      }
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          width: '100vw',
          bgcolor: Colors.mainBlue,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            color: Colors.mainWhite,
            fontSize: '16px',
            p: '10px',
            textTransform: 'uppercase',
          }}
        >
          {`${t('common.shutis')}`}
        </Typography>
      </Box>
      <form method="post">
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
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 450,
            py: '40px',
            px: '90px',
          }}
        >
          <Typography
            sx={{
              color: Colors.textBlue,
              fontSize: '20px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {`${t('common.web_teacher')}`}
          </Typography>
          <Divider sx={{ width: '270px', my: 2 }} />
          <Controller
            name="username"
            control={control}
            render={({ field: { ref, value, ...rest } }: FieldValues) => (
              <TextField
                {...rest}
                inputRef={ref}
                variant="outlined"
                id="username"
                fullWidth
                sx={{ mt: 2, mb: 4 }}
                placeholder="Багшийн код"
                error={!_.isEmpty(errors.username)}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { ref, value, ...rest } }: FieldValues) => (
              <TextField
                {...rest}
                inputRef={ref}
                variant="outlined"
                id="password"
                fullWidth
                placeholder="Нууц үг"
                error={!_.isEmpty(errors.password)}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              my: 4,
              color: Colors.textBlue,
              bgcolor: Colors.btn,
              fontWeight: 700,
            }}
            onClick={handleSubmit(onSubmit)}
          >
            {`${t('common.login')}`}
          </Button>
          <img src="/img/login.png" style={{ objectFit: 'cover' }} />
        </Box>
      </form>
      <Box
        sx={{
          width: '100vw',
          bgcolor: Colors.mainBlue,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: Colors.mainWhite, fontSize: '14px' }}>
          {`${t('common.copyright')}`}
        </Typography>
      </Box>
    </Box>
  )
}

export default LoginContainer
