import React from 'react'

import { Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

import { Grid, Button, Paper, makeStyles } from '@material-ui/core'

import userStore from '../stores/userStore'

import adminHomeMainImg from '../assets/admin_home_2x.png'

const AdminHome = () => {
  const classes = useStyles()
  const studio = userStore.user ? userStore.user.studio : ''

  return (
    <>
      <Header />
      <Grid container md={12} style={{ height: 'calc(100vh - 327px)' }}>
        <Grid item sm />

        <Grid container item sm={9}>
          <Paper className={classes.paperImage}>
            <p className={classes.paperGreeting}>Welcome {studio},</p>

            <Grid
              container
              item
              justify="center"
              style={{ marginTop: '8.75rem' }}
            >
              <Grid item style={{ marginRight: '4.5rem' }}>
                <Link to="/form" style={{ textDecoration: 'none' }}>
                  <Button className={classes.button}>동의서 보기</Button>
                </Link>
              </Grid>

              <Grid item style={{ marginLeft: '4.5rem' }}>
                <Link to="/list" style={{ textDecoration: 'none' }}>
                  <Button className={classes.button}>동의자 명단</Button>
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item sm />
      </Grid>
      <Footer />
    </>
  )
}

const useStyles = makeStyles(() => ({
  paperImage: {
    width: '100%',
    height: '31.375rem',
    backgroundImage: `url(${adminHomeMainImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  paperGreeting: {
    fontSize: '5rem',
    marginLeft: '7.875rem',
    marginTop: '11.375rem',
    fontWeight: 900,
    lineHeight: 1.14,
    letterSpacing: '-0.125rem',
    color: '#ffffff',
  },
  button: {
    width: '23.688rem',
    height: '11.875rem',
    color: '#ffffff',
    fontSize: '2.188rem',
    backgroundColor: '#30bbc3',
    borderRadius: '5.925rem',
    fontWeight: 'bold',
  },
}))

export default AdminHome
