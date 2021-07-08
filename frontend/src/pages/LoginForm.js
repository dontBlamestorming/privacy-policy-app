import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import userStore from '../stores/userStore'

import { observer } from 'mobx-react-lite'

import {
  Container,
  Hidden,
  Button,
  makeStyles,
  TextField,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from '@material-ui/core/'

import API from '../api/index'

import loginImage from '../assets/login_form_main.jpg'
import loginTypo from '../assets/login_form_typo.png'

const LoginForm = observer(() => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  })
  const classes = useStyles()
  const theme = useTheme()
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))

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
    let path = '/studio'

    return <Redirect to={path} />
  }

  return (
    <Container className={classes.container} maxWidth="xl">
      <Grid container className={classes.wrapper} justify="center">
        <Grid container item md={9}>
          <Grid
            className={classes.loginSection}
            container
            justify={matchesSM ? 'center' : null}
            alignContent="center"
            item
            md={6}
            sm
            xs
          >
            <Hidden smDown>
              <Grid className={classes.mainTypo} item md={9}>
                <img
                  src={loginTypo}
                  alt="Agreement Management"
                  style={{ width: '100%', height: '100%' }}
                />
              </Grid>
            </Hidden>

            <Grid onSubmit={handleSubmit} component="form" md={8} sm={7}>
              <Grid className={classes.loginField}>
                <InputBox
                  name="username"
                  label="Your ID"
                  type="text"
                  placeholder="Enterh your ID"
                  value={form.username}
                  form={form}
                  setForm={setForm}
                />

                <InputBox
                  name="password"
                  label="password"
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  form={form}
                  setForm={setForm}
                />
              </Grid>

              <Grid container justify="center">
                <Grid item>
                  <Button
                    classes={{ root: classes.signInBtn }}
                    type="submit"
                    variant="outlined"
                    color="primary"
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid className={classes.imageSection} item md={6} xs={12}>
            <Paper className={classes.mainImage} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
})

const InputBox = ({ name, label, type, placeholder, form, setForm, value }) => {
  const classes = useStyles()

  const onChange = event => {
    const {
      target: { name, value },
    } = event

    setForm({ ...form, [name]: value })
  }

  return (
    <TextField
      name={name}
      label={label}
      type={type}
      placeholder={placeholder}
      className={classes.inputField}
      InputLabelProps={{
        shrink: true,
        focused: false,
        classes: { shrink: classes.inputField_label },
      }}
      InputProps={{
        classes: { underline: classes.inputOnFocued },
      }}
      value={value}
      onChange={onChange}
    />
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: '0 0',
    flex: 1,
  },

  wrapper: {
    height: 'calc(100vh - 215px)',

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
  mainTypo: {
    marginBottom: '41px',
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
