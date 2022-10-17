import React from 'react'

// components
import { Container, Grid } from '@mui/material'

type Props = {}

const BlankContainer: React.FC<Props> = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={3.75}>
          <Grid item xs={12} sm={12} md={9}>
            content
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            content
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default BlankContainer
