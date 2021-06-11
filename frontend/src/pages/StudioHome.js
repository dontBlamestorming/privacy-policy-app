import React from 'react'

import { Link } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

import {
  Container,
  Grid,
  Button,
  makeStyles,
  Hidden,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'

import userStore from '../stores/userStore'

import adminHomeMainImg from '../assets/admin_home_2x.png'

const StudioHome = () => {
  const classes = useStyles()
  const studio = userStore.user ? userStore.user.studio : ''
  const theme = useTheme()
  const matcheSM = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Header />
      <Container maxWidth="xl" style={{ padding: '0 0' }}>
        <Grid container className={classes.container}>
          <Hidden smDown>
            <Grid item md />
          </Hidden>
          <Grid container item md={9}>
            <Grid
              container
              className={classes.mainImage}
              item
              md={12}
              sm={12}
              xs={12}
            >
              <Grid item>
                <p className={classes.paperGreeting}>
                  Welcome
                  {matcheSM ? <br /> : ' '}
                  {studio},
                </p>
              </Grid>

              <Hidden smDown>
                <Grid container direction="column" justify="flex-end">
                  <Grid container justify="space-evenly">
                    <Grid>
                      <Link to="/agreement" style={{ textDecoration: 'none' }}>
                        <Button
                          className={classes.button}
                          style={{ display: 'absolute', top: '100px' }}
                        >
                          동의서 보기
                        </Button>
                      </Link>
                    </Grid>
                    <Grid>
                      <Link to="/agreements" style={{ textDecoration: 'none' }}>
                        <Button
                          className={classes.button}
                          style={{ display: 'absolute', top: '100px' }}
                        >
                          동의자 명단
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>

            <Grid
              className={classes.buttonContainer}
              container
              item
              md={12}
              sm={12}
              xs={12}
              justify="space-evenly"
            >
              <Hidden mdUp>
                <Grid item>
                  <Link to="/agreement" style={{ textDecoration: 'none' }}>
                    <Button className={classes.button}>동의서 보기</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/agreements" style={{ textDecoration: 'none' }}>
                    <Button className={classes.button}>동의자 명단</Button>
                  </Link>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item md />
          </Hidden>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100vh - 300px)',
  },
  // wrapper: {
  //   // maxHeight: '70%',
  //   [theme.breakpoints.down('sm')]: {
  //     // height: '50%',
  //     margintLeft: '0',
  //   },
  // },
  mainImage: {
    width: '100%',
    height: '73%',
    backgroundImage: `url(${adminHomeMainImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',

    [theme.breakpoints.down('xs')]: {
      height: '50%',
    },
  },
  paperGreeting: {
    fontSize: '5rem',
    marginLeft: '7.875rem',
    marginTop: '11.375rem',
    fontWeight: 900,
    lineHeight: 1.14,
    letterSpacing: '-0.125rem',
    color: '#ffffff',
    [theme.breakpoints.down('xs')]: {
      marginTop: '8.938rem',
      marginLeft: '1.75rem',
      fontSize: '4.375rem',
    },
  },
  button: {
    width: '23.688rem',
    height: '11.875rem',
    color: '#ffffff',
    fontSize: '2.188rem',
    backgroundColor: '#30bbc3',
    borderRadius: '20px',
    fontWeight: 'bold',

    [theme.breakpoints.down('sm')]: {
      width: '18.75rem',
      height: '9.438rem',
      fontSize: '1.875rem',
      boxShadow: '0px 15px 30px 0 rgba(35, 27, 27, 0.17)',
    },
    [theme.breakpoints.down('xs')]: {
      width: '23.125rem',
      height: '8.75rem',
      fontSize: '1.875rem',
      boxShadow: '0px 15px 30px 0 rgba(35, 27, 27, 0.17)',
    },
  },
  buttonContainer: {
    [theme.breakpoints.down('xs')]: {
      maxHeight: '50%',
    },
  },
}))

export default StudioHome
