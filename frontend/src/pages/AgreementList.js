import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'
import DataTable from '../components/DataTable'

import { observer } from 'mobx-react-lite'

import {
  Container,
  Grid,
  Paper,
  Button,
  makeStyles,
  Hidden,
} from '@material-ui/core'

import adminHomeMainImg from '../assets/admin_home_2x.png'

const AgreementList = observer(() => {
  const classes = useStyles()

  return (
    <>
      <Header />

      <Container className={classes.container}>
        <Grid container className={classes.mainImage}>
          <Hidden smDown>
            <Grid container item justify="space-evenly">
              <Link to="/agreements" style={{ textDecoration: 'none' }}>
                <Button className={classes.button}>동의서 보기</Button>
              </Link>

              <Link to="/agreements" style={{ textDecoration: 'none' }}>
                <Button className={classes.button}>개인정보이용동의서</Button>
              </Link>
            </Grid>
          </Hidden>
        </Grid>

        <Grid
          className={classes.dataTableWrapper}
          container
          item
          justify="center"
        >
          <Grid className={classes.dataTable} item sm={10} xs={10}>
            <DataTable />
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </>
  )
})

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100vh - 285px)',

    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh)',
      padding: '0 0',
    },
  },
  mainImage: {
    maxWidth: '100%',
    backgroundImage: `url(${adminHomeMainImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
    [theme.breakpoints.down('sm')]: {
      padding: '0 0',
      height: '200px',
    },
  },
  button: {
    display: 'absolute',
    top: '100px',
    width: '23.688rem',
    height: '11.875rem',
    color: '#ffffff',
    fontSize: '2.188rem',
    backgroundColor: '#30bbc3',
    borderRadius: '1.25rem',
    fontWeight: 'bold',
    marginTop: '6rem',
    boxShadow: '0px 15px 30px 0 rgba(35, 27, 27, 0.17)',
  },
  dataTableWrapper: {
    marginBottom: '20px',
    backgroundColor: '#f1eff0',
  },
  dataTable: {
    [theme.breakpoints.down('sm')]: {
      margin: '66px 0 115px 0',
    },
  },
}))

export default AgreementList
