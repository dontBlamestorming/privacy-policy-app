import React from 'react'
import Grid from '@material-ui/core/Grid'
import {
  Container,
  Button,
  Hidden,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@material-ui/core'

import { Link } from 'react-router-dom'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'

import userStore from '../stores/userStore'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const classes = useStyles()
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Container maxWidth="xl" style={{ padding: '0 0' }}>
      <Grid
        container
        className={classes.container}
        md={12}
        justify="center"
        alignItems="center"
      >
        <Grid
          container
          item
          justify="space-between"
          alignItems="center"
          md={11}
          sm={11}
          xs={11}
        >
          <Link to="/studio">
            <IconButton
              // className={classes.buttonLeft}
              className={classes.icon}
            >
              <HomeIcon />
            </IconButton>
          </Link>

          <Hidden smDown>
            <Button
              className={classes.buttonRight}
              onClick={() => userStore.logout()}
            >
              <Grid container direction="column">
                <span className={classes.text}>
                  hello {userStore.user.name}님!
                </span>
                <Typography>LOGOUT</Typography>
              </Grid>
            </Button>
          </Hidden>

          <Hidden mdUp>
            <IconButton
              style={{ padding: '0 0' }}
              onClick={() => userStore.logout()}
            >
              <span className={classes.text_mobile}>LOGOUT</span>
              <ExitToAppIcon className={classes.icon} />
            </IconButton>
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    height: '133px',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
    },
  },
  buttonLeft: {
    color: '#30bbc3',

    [theme.breakpoints.down('sm')]: {},
  },
  buttonRight: {
    [theme.breakpoints.down('sm')]: {},
  },
  text: {
    fontSize: '1.625rem',
    color: '#30bbc3',
    fontFamily: 'NotoSansCJKkr',
  },
  text_mobile: {
    fontSize: '16px',
    color: '#111e3f',
    fontWeight: 500,
    letterSpacing: '-0.9px',
    fontFamily: 'NotoSansCJKkr',
    paddingRight: '5px',
  },
  icon: {
    width: '44px',
    height: '44px',
    color: '#ffffff',
    backgroundColor: '#111e3f',
    borderRadius: '10px',
    [theme.breakpoints.down('xs')]: {
      width: '33px',
      height: '33px',
    },
  },
}))

export default Header
