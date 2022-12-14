import React, { useState } from 'react'
import { useMutation } from 'react-query'
import Colors from '@theme/colors'
import { t } from 'i18next'

// components
import {
  Box,
  Typography,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from '@mui/material'
import { Close as IconClose } from '@mui/icons-material'
import { postStudentStatusEdited } from '@services/index'
import Loading from '@components/Loading'
import { StudentStatusEdited } from '@constants/types'
import { setToStorage } from '@utils/common'

type Props = {
  showModal: boolean
  params: StudentStatusEdited | {}
  closeModalHandler: () => any
}

const Modal: React.FC<Props> = ({ showModal, closeModalHandler, params }) => {
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailed, setOpenFailed] = useState(false)
  const {
    status: postStatus,
    data,
    mutateAsync,
  } = useMutation(postStudentStatusEdited)
  const onSubmitHandler = (payload) => {
    const res = mutateAsync(payload, { onSuccess: () => data })
    return res
  }

  const onSubmit = () => {
    onSubmitHandler(params).then((data) => {
      if (data?.data?.success === true) {
        setOpenSuccess(true)
        setOpenFailed(false)
        setToStorage('attendance_edited', 'true')
        closeModalHandler()
      } else {
        setOpenSuccess(false)
        setOpenFailed(true)
      }
    })
  }

  if (!showModal) return null
  return (
    <>
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
      {postStatus != 'success' && postStatus != 'idle' && <Loading />}
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
          <IconButton onClick={closeModalHandler}>
            <IconClose sx={{ color: Colors.mainBlack }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            pt: { xs: 4, sm: 4, md: 6 },
            px: { xs: 4, sm: 8, md: 14 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: Colors.secondBlue,
              fontSize: '20px',
              textAlign: 'center',
            }}
          >
            {`${t('modal.message')}`}
          </Typography>
          <Box sx={{ mt: 4, mb: 2, height: 100 }}>
            <img
              src="/img/question_mark.png"
              height="100%"
              width="100%"
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ display: 'flex', mt: 4 }}>
            <Button
              variant="contained"
              sx={{ mr: 2, width: 100, bgcolor: 'green' }}
              onClick={onSubmit}
            >
              {`${t('common.yes')}`}
            </Button>
            <Button
              variant="contained"
              sx={{ width: 100, bgcolor: 'red' }}
              onClick={closeModalHandler}
            >
              {`${t('common.no')}`}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default Modal
