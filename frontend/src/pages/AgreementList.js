import React from 'react'

import DataTable from '../components/DataTable'

import { Container, Grid, makeStyles } from '@material-ui/core'

import adminHomeMainImg from '../assets/studio_home.png'
import agreementTypo from '../assets/agreementList_typo.png'

const AgreementList = React.memo(() => {
  const classes = useStyles()

  return (
    <>
      <Container className={classes.container}>
        <Grid
          container
          className={classes.mainImage}
          justify="center"
          alignItems="center"
        >
          <Grid item md={6} sm={8}>
            <img
              src={agreementTypo}
              alt="개인정보동의서 동의자 리스트"
              style={{ width: '100%', height: '100%' }}
            />
          </Grid>
        </Grid>

        <Grid className={classes.dataTableWrapper} container justify="center">
          <Grid className={classes.dataTable} sm={10} xs={10}>
            <DataTable />
          </Grid>
        </Grid>
      </Container>
    </>
  )
})

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    backgroundColor: '#f1eff0',
    marginBottom: '3.625rem',
    padding: '0 0',
  },
  mainImage: {
    width: '100%',
    height: '25vh',
    backgroundImage: `url(${adminHomeMainImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
  },
  dataTableWrapper: {
    marginBottom: '70px',
    backgroundColor: '#f1eff0',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '50px',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '25px',
    },
  },
  dataTable: {
    height: '30%',
    [theme.breakpoints.down('sm')]: {
      margin: '66px 0 115px 0',
    },
  },
}))

export default AgreementList
