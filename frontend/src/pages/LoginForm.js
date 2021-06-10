import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import userStore from '../stores/userStore'

import { observer } from 'mobx-react-lite'

import Footer from '../components/Footer'

import {
  Button,
  makeStyles,
  TextField,
  Typography,
  Grid,
  Paper,
  Box,
  Hidden,
  useMediaQuery,
  useTheme,
} from '@material-ui/core/'

import API from '../api/index'

import loginImage from '../assets/main.jpg'

const LoginForm = observer(() => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSubmit = e => {
    e.preventDefault()

    API.post('/account/login', { ...form })
      .then(res => {
        userStore.login(res.data.token)
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert('잘못된 계정 정보입니다.')
        } else {
          console.log(error)
        }
      })
  }

  if (userStore.user) {
    let path

    if (userStore.user.is_studio_staff) {
      path = '/agreement'
    } else if (userStore.user.is_studio_manager) {
      path = '/studio'
    } else {
      // 현재는 슈퍼유저인 경우 여기로 들어옴
      path = '/studio'
    }

    return <Redirect to={path} />
  }

  return (
    // <div style={{ display: 'flex', flexDirection: 'column' }}>
    <>
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.container}>
          <Hidden smDown xsDown>
            <Grid item md />
          </Hidden>

          <Grid
            container
            direction={matches ? 'column' : 'row'}
            item
            md={9}
            sm={12}
            xs
          >
            <Grid
              className={classes.loginSection}
              container
              direction="column"
              justify="center"
              alignContent="center"
              item
              md={6}
              sm
              xs
            >
              {/* Title */}
              <Grid item>
                <Typography
                  className={classes.title}
                  variant="h2"
                  component="h3"
                >
                  Photo Studio
                </Typography>
                <Typography
                  className={classes.title}
                  variant="h2"
                  component="h3"
                >
                  Management
                </Typography>
              </Grid>

              {/* Login  */}
              <Grid item className={classes.loginField}>
                <Box style={{ marginTop: '1.313rem' }}>
                  <TextField
                    label="Your ID"
                    type="text"
                    placeholder="Enter your ID"
                    className={classes.inputField}
                    style={{ width: '100%' }}
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    InputLabelProps={{
                      shrink: true,
                      focused: false,
                      classes: { shrink: classes.inputField_label },
                    }}
                    InputProps={{
                      classes: { underline: classes.inputOnFocued },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item className={classes.passwordField}>
                <Box>
                  <TextField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    className={classes.inputField}
                    InputLabelProps={{
                      shrink: true,
                      focused: false,
                      classes: { shrink: classes.inputField_label },
                    }}
                    InputProps={{
                      classes: { underline: classes.inputOnFocued },
                    }}
                    value={form.password}
                    onChange={e =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </Box>
              </Grid>
              <Grid item>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    classes={{ root: classes.signInBtn }}
                    type="submit"
                    variant="outlined"
                    color="primary"
                  >
                    Sign In
                  </Button>
                </Box>
              </Grid>
            </Grid>

            {/* Image */}
            <Grid className={classes.imageSection} item md={6} sm xs>
              <Paper className={classes.mainImage} />
            </Grid>
          </Grid>

          <Hidden smDown xsDown>
            <Grid item md />
          </Hidden>
        </Grid>
      </form>
      <Footer />
    </>
    // </div>
  )
})

const useStyles = makeStyles(theme => ({
  container: {
    // height: '100vh',
    height: 'calc(100vh - 182px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 139px)',
    },
  },
  loginSection: {
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#f1eff0',
      order: 2,
    },
  },
  title: {
    fontSize: '5rem',
    fontWeight: 900,
    fontFamily: 'NotoSansCJKkr',
    lineHeight: 1.14,
    letterSpacing: '-0.125rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loginField: {
    [theme.breakpoints.down('sm')]: {
      width: '60%',
    },
  },
  passwordField: {
    [theme.breakpoints.down('sm')]: {
      width: '60%',
    },
  },
  imageSection: {
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  mainImage: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${loginImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      backgroundPosition: '50% 50%',
    },
  },
  inputField: {
    width: '100%',
    height: '50px',
    marginTop: '0.625rem',
    marginBottom: '1.25rem',
  },
  inputOnFocued: {
    '&:after': {
      borderBottom: '3px solid #30bbc3',
    },
  },
  inputField_label: {
    fontSize: '1.25rem',
    color: '#30bbc3',
    fontWeight: 'bold',
    fontFamily: 'NotoSansCJKkr',
  },
  signInBtn: {
    marginTop: '2.125rem',
    fontSize: '1.25rem',
    color: '#30bbc3',
    border: '1px solid #30bbc3',
    borderRadius: '1.75rem',
  },
}))

export default LoginForm
