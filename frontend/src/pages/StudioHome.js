import React from 'react'

import { Link } from 'react-router-dom'

import {
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
  const studio = userStore.user ? userStore.user.studio : ''
  const classes = useStyles()
  const theme = useTheme()
  const matcheSM = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Grid container className={classes.container}>
        <Hidden smDown>
          <Grid item md />
        </Hidden>
        <Grid container item md={9} className={classes.wrapper}>
          <Grid
            container
            className={classes.mainImage}
            item
            alignItems="center"
          >
            <Grid item>
              <p className={classes.paperGreeting}>
                Welcome
                {matcheSM ? <br /> : ' '}
                {studio},
              </p>
            </Grid>
          </Grid>

          <Grid
            className={classes.buttonContainer}
            container
            item
            justify="space-evenly"
          >
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
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item md />
        </Hidden>
      </Grid>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0 0',
    flex: 1,
    height: 'calc(100vh - 349px)',
  },
  wrapper: {
    [theme.breakpoints.down('sm')]: {
      margintLeft: '0',
    },
  },
  mainImage: {
    height: '70%',
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

  buttonContainer: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      fontSize: '1.875rem',
      marginTop: 'auto 0',
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: '50%',
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
    boxShadow: '0px 15px 30px 0 rgba(35, 27, 27, 0.17)',
    display: 'absolute',
    top: '-60%',

    '&:hover': {
      backgroundColor: '#30bbc3',
    },

    [theme.breakpoints.down('sm')]: {
      display: 'block',
      top: '0',
      width: '18.75rem',
      height: '9.438rem',
      fontSize: '1.875rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: '23.125rem',
      height: '8.75rem',
      fontSize: '1.875rem',
    },
  },
}))

export default StudioHome
