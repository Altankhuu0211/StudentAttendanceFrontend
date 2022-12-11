import React, { useState, useEffect } from 'react'
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

const LoginContainer: React.FC<{}> = () => {
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
    onSubmitHandler(getValues()).then((data) => {
      if (data?.status == 200) {
        setOpenSuccess(true)
        setToStorage('token', data?.data?.token)
        setToStorage('permission', data?.data?.result?.permission)
        setToStorage('user_code', data?.data?.result?.code_)
        setToStorage('user_fname', data?.data?.result?.fname)
        setToStorage('user_lname', data?.data?.result?.lname)
        if (data?.data?.result?.permission == 3) router.push(PageRoutes.HOME)
        else if (data?.data?.result?.permission == 2)
          router.push(PageRoutes.FORM)
      } else {
        setOpenFailed(true)
      }
    })
  }

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault()
        onSubmit()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

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
            fontSize: { xs: '14px', sm: '16px' },
            p: '10px',
            textTransform: 'uppercase',
          }}
        >
          {`${t('common.shutis')}`}
        </Typography>
      </Box>
      <form method="post" onSubmit={onSubmit}>
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
          <Box sx={{ height: 100, mb: 3 }}>
            <img
              src="/img/MUST_logo.png"
              height="100%"
              width="100%"
              style={{ objectFit: 'cover' }}
            />
          </Box>
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
                placeholder="Нэвтрэх нэр"
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
              '&:hover': {
                color: Colors.mainWhite,
              },
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
