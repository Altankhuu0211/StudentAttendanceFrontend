import React, { useState } from 'react'
import _ from 'lodash'
import { useQuery } from 'react-query'
import { useMutation } from 'react-query'
import { t } from 'i18next'
import Colors from '@theme/colors'

// components
import StickySidebar from '@components/StickySidebar'
import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import Loading from '@components/Loading'
import { fetchStudentList, postStudentChipNumber } from '@services/index'
import { Edit as IconEdit } from '@mui/icons-material'
import useFormValidation, { initialValues } from './useFormValidation'
import { FieldValues } from 'react-hook-form'

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
    backgroundColor: Colors.table_grey,
  },
}))

type Props = {}

const FormContainer: React.FC<Props> = () => {
  const [studentCode, setStudentCode] = useState('')
  const [openSuccess, setOpenSuccess] = useState(false)
  const [openFailed, setOpenFailed] = useState(false)
  const { Controller, methods } = useFormValidation()
  const {
    control,
    getValues,
    reset,
    formState: { errors },
  } = methods

  const {
    status: postChipStatus,
    data,
    mutateAsync,
  } = useMutation(postStudentChipNumber)
  const onSubmitHandler = (payload) => {
    const res = mutateAsync(payload, { onSuccess: () => data })
    return res
  }

  const { status: studentsStatus, data: studentsData } = useQuery(
    ['student-attendance'],
    () => {
      return fetchStudentList()
    }
  )

  if (studentsStatus != 'success') {
    return <Loading />
  }

  console.log('studentList:', studentsData)

  const response = studentsData?.data?.data

  const onSubmit = () => {
    const payload = {
      ...getValues(),
    }
    console.log('payload:', payload)
    // onSubmitHandler(payload).then((data) => {
    //   if (data?.data?.success === true) {
    //     setOpenFailed(false)
    //     setOpenSuccess(true)
    //     reset(initialValues)
    //   } else {
    //     setOpenSuccess(false)
    //     setOpenFailed(true)
    //   }
    // })
  }

  return (
    <>
      {postChipStatus != 'success' && postChipStatus != 'idle' && <Loading />}
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'left' }}>
        <Box sx={{ width: '60%', mr: 8 }}>
          <TableContainer component={Paper}>
            <Table aria-label="caption table" sx={{ width: '100%' }}>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell
                    variant="head"
                    align="center"
                    sx={{ width: 150 }}
                  >
                    {`${t('common.student_code')}`}
                  </StyledTableCell>
                  <StyledTableCell variant="head" align="center">
                    {`${t('common.student_lname')}`}
                  </StyledTableCell>
                  <StyledTableCell variant="head" align="center">
                    {`${t('common.student_fname')}`}
                  </StyledTableCell>
                  <StyledTableCell variant="head" align="center">
                    {`${t('common.chip_number')}`}
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {response.map((v, i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell align="center">
                      {v.student_id}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {v.student_lname}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {v.student_fname}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {v.chip_number}
                      <IconButton
                        sx={{ ml: 6 }}
                        onClick={() => setStudentCode(v.student_id)}
                      >
                        <IconEdit sx={{ fontSize: '16px' }} />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ width: '40%' }}>
          <StickySidebar offsetTop={16} offsetBottom={16}>
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
                  bgcolor: Colors.table_grey,
                  py: 4,
                  px: 8,
                  border: '1px solid black',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4" sx={{ textAlign: 'center', mb: 4 }}>
                  {`${t('form.title')}`}
                </Typography>

                <Typography>{`${t('common.student_code')}:`}</Typography>
                <Controller
                  name="student_id"
                  control={control}
                  render={({ field: { ref, value, ...rest } }: FieldValues) => (
                    <TextField
                      {...rest}
                      inputRef={ref}
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: Colors.lineGrey,
                        bgcolor: Colors.mainWhite,
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-input': {
                          p: 1,
                        },
                        mt: 1,
                        mb: 2,
                      }}
                      value={studentCode}
                      error={!_.isEmpty(errors.student_id)}
                      onChange={(e) => setStudentCode(e.target.value)}
                    />
                  )}
                />
                <Typography>{`${t('common.chip_number')}:`}</Typography>
                <Controller
                  name="chip_number"
                  control={control}
                  render={({ field: { ref, value, ...rest } }: FieldValues) => (
                    <TextField
                      {...rest}
                      inputRef={ref}
                      variant="outlined"
                      fullWidth
                      sx={{
                        color: Colors.lineGrey,
                        bgcolor: Colors.mainWhite,
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-input': {
                          p: 1,
                        },
                        mt: 1,
                      }}
                      error={!_.isEmpty(errors.chip_number)}
                    />
                  )}
                />
                <Button variant="contained" sx={{ my: 4 }} onClick={onSubmit}>
                  {`${t('common.save')}`}
                </Button>
              </Box>
            </form>
          </StickySidebar>
        </Box>
      </Box>
    </>
  )
}

export default FormContainer
