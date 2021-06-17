import React from 'react'

import DataTable from '../components/DataTable'

import { Container, Grid, makeStyles } from '@material-ui/core'

import adminHomeMainImg from '../assets/admin_home_2x.png'
import agreementTypo from '../assets/agreementList_typo.png'

const AgreementList = React.memo(() => {
  const classes = useStyles()

  return (
    <>
      <Container
        className={classes.container}
        component="main"
        style={{ padding: '0 0' }}
      >
        <Grid container>
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
        </Grid>
      </Container>
    </>
  )
})

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f1eff0',
    marginBottom: '5.625rem',

    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh)',
      padding: '0 0',
    },
  },
  mainImage: {
    width: '100%',
    height: '25%',
    backgroundImage: `url(${adminHomeMainImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    [theme.breakpoints.down('sm')]: {
      padding: '0 0',
      height: '200px',
    },
  },
  paperTitle: {
    fontSize: '4rem',
    marginLeft: '7.875rem',
    fontWeight: 900,
    lineHeight: 1.14,
    letterSpacing: '-0.125rem',
    color: '#ffffff',
    textShadow: '0px 15px 30px rgba(35, 27, 27, 0.34)',

    [theme.breakpoints.down('xs')]: {
      marginTop: '8.938rem',
      marginLeft: '1.75rem',
      fontSize: '4.375rem',
    },
  },
  dataTableWrapper: {
    height: '68%',
    marginBottom: '20px',
    backgroundColor: '#f1eff0',
  },
  dataTable: {
    height: '30%',
    [theme.breakpoints.down('sm')]: {
      margin: '66px 0 115px 0',
    },
  },
}))

export default AgreementList
