import React from 'react'

import {
  Grid,
  Button,
  Hidden,
  makeStyles,
  Typography,
  IconButton,
} from '@material-ui/core'

import { Link } from 'react-router-dom'

import LogoutIcon from '../assets/header_logout.png'
import HomeIcon from '@material-ui/icons/Home'

import userStore from '../stores/userStore'

const Header = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      className={classes.wrapper}
      justify="center"
      alignItems="center"
    >
      <Grid
        container
        // item
        justify="space-between"
        alignItems="center"
        md={11}
        sm={11}
        xs={11}
      >
        <Link to="/studio">
          <IconButton className={classes.icon} disableRipple>
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
            <img
              className={classes.icon}
              src={LogoutIcon}
              alt="로그아웃 버튼"
            />
          </IconButton>
        </Hidden>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(theme => ({
  container: { padding: '0 0' },
  wrapper: {
    height: '133px',
    [theme.breakpoints.down('sm')]: {
      height: '60px',
    },
  },
  buttonLeft: {
    color: '#30bbc3',
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
    '&:hover': {
      backgroundColor: '#30bbc3',
    },
    [theme.breakpoints.down('xs')]: {
      width: '33px',
      height: '33px',
    },
  },
}))

export default Header
