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
} from '@material-ui/core/'

import API from '../api/index'

import loginImage from '../assets/main.jpg'

const LoginForm = observer(() => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const classes = useStyles()

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
    const path = userStore.user.is_studio_manager ? '/manager' : '/form'

    return <Redirect to={path} />
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container md={12} style={{ height: 'calc(100vh - 194px)' }}>
          <Grid item sm />

          <Grid container item sm={9}>
            <Grid container sm={6} item direction="column" justify="center">
              <Grid item>
                <Typography
                  variant="h2"
                  component="h3"
                  style={{
                    fontSize: '5rem',
                    fontWeight: 900,
                    fontFamily: 'NotoSansCJKkr',
                    lineHeight: 1.14,
                    letterSpacing: '-0.125rem',
                  }}
                >
                  Photo Studio
                </Typography>
                <Typography
                  variant="h2"
                  component="h3"
                  style={{
                    fontSize: '5rem',
                    fontWeight: 900,
                    fontFamily: 'NotoSansCJKkr',
                    lineHeight: 1.14,
                    letterSpacing: '-0.125rem',
                  }}
                >
                  Management
                </Typography>
              </Grid>

              <Grid item>
                <Box style={{ marginTop: '1.313rem' }}>
                  <TextField
                    label="Your ID"
                    type="text"
                    placeholder="Enter your ID"
                    className={classes.inputField}
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
              <Grid item>
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
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ width: '28.125rem' }}
                >
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

            {/* 로그인 이미지 영역 */}
            <Grid item sm={6}>
              <Paper
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${loginImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
            </Grid>
          </Grid>

          <Grid item sm />
        </Grid>

        <Footer />
      </form>
    </>
  )
})

const useStyles = makeStyles(() => ({
  container: {
    height: '80%',
  },
  loginPage: {
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '300px',
    width: '100%',
    marginTop: '40px',
    padding: '0 12px',
  },
  inputField: {
    width: '28.125rem',
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

// <form onSubmit={handleSubmit}>
//   <Typography
//     variant="h2"
//     component="h3"
//     style={{
//       fontSize: '5rem',
//       fontWeight: 900,
//       fontFamily: 'NotoSansCJKkr',
//       lineHeight: 1.14,
//       letterSpacing: '-0.125rem',
//     }}
//   >
//     Photo Studio Management
//   </Typography>

//   <Box style={{ marginTop: '1.313rem' }}>
//     <TextField
//       label="Your ID"
//       type="text"
//       placeholder="Enter your ID"
//       className={classes.inputField}
//       onChange={e => setForm({ ...form, email: e.target.value })}
//       InputLabelProps={{
//         shrink: true,
//         focused: false,
//         classes: { shrink: classes.inputField_label },
//       }}
//       InputProps={{ classes: { underline: classes.inputOnFocued } }}
//     />
//   </Box>

//   <Box>
//     <TextField
//       label="Password"
//       type="password"
//       placeholder="Enter your password"
//       className={classes.inputField}
//       InputLabelProps={{
//         shrink: true,
//         focused: false,
//         classes: { shrink: classes.inputField_label },
//       }}
//       InputProps={{ classes: { underline: classes.inputOnFocued } }}
//       onChange={e => setForm({ ...form, password: e.target.value })}
//     />
//    </Box>

//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       style={{ width: '28.125rem' }}
//     >
//       <Button
//         classes={{ root: classes.signInBtn }}
//         type="submit"
//         variant="outlined"
//         color="primary"
//       >
//         Sign In
//       </Button>
//     </Box>
//   </Box>
// </form>
