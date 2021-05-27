import React, { useState, useRef } from 'react'

import Header from '../components/Header'
import SignatureSpace from '../components/SignatureSpace'
import NoticeTable from '../components/NoticeTable'
import Footer from '../components/Footer'

import { makeStyles } from '@material-ui/core/styles'

import {
  Container,
  Button,
  Grid,
  Paper,
  Radio,
  Input,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import { observer } from 'mobx-react-lite'

import userStore from '../stores/userStore'

import API from '../api/index'

const initialForm = {
  name: '',
  email: '',
  gender: '',
  birthDay: '',
  phone: '',
  signature: '',
  collectingPrivacy: false,
  providingPrivacy: false,
}

const Agreement = observer(() => {
  const [form, setForm] = useState(initialForm)
  const classes = useStyles()
  const canvasRef = useRef(null)

  const onSubmit = e => {
    e.preventDefault()

    const data = new FormData()

    data.append('receiver', userStore.user.user_id)
    data.append('studio', userStore.user.studio_id)
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('gender', form.gender)
    data.append('birthday', form.birthday)
    data.append('phone', form.phone)
    data.append('sign', form.signature, 'sign.png')

    API.post('/forms/create', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        if (res.status === 201) {
          alert('정상적으로 제출되었습니다. 감사합니다.')
          setForm(initialForm)
          canvasRef.current.clear()
        }
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      <Header />
      <Container className={classes.container} component="main">
        <div className={classes.paper}>
          <NoticeTable />

          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper style={{ borderRadius: '3.125rem' }}>
                  <FormControlLabel
                    classes={{ label: classes.form_label }}
                    style={{ marginLeft: '3.813rem' }}
                    required
                    control={
                      <Radio
                        icon={
                          <CheckCircleOutlineIcon
                            style={{ fill: '#30bbc3', fontSize: '3.125rem' }}
                          />
                        }
                        checkedIcon={
                          <CheckCircleIcon
                            style={{ fill: '#30bbc3', fontSize: '3.125rem' }}
                          />
                        }
                        checked={form.collectingPrivacy}
                        onClick={e =>
                          setForm({
                            ...form,
                            collectingPrivacy: !form.collectingPrivacy,
                          })
                        }
                      />
                    }
                    label="(필수) 개인정보 수집 및 이용 동의"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  style={{
                    borderRadius: '3.125rem',
                  }}
                >
                  <FormControlLabel
                    classes={{ label: classes.form_label }}
                    style={{ marginLeft: '3.813rem' }}
                    required
                    control={
                      <Radio
                        icon={
                          <CheckCircleOutlineIcon
                            style={{ fill: '#30bbc3', fontSize: '3.125rem' }}
                          />
                        }
                        checked={form.providingPrivacy}
                        checkedIcon={
                          <CheckCircleIcon
                            style={{ fill: '#30bbc3', fontSize: '3.125rem' }}
                          />
                        }
                        onClick={e =>
                          setForm({
                            ...form,
                            providingPrivacy: !form.providingPrivacy,
                          })
                        }
                        color="primary"
                      />
                    }
                    label="(필수) 제 3자(써머캣) 정보 제공 동의"
                  />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <p style={{ textAlign: 'center', fontSize: '1.375rem' }}>
                  ※ 위 개인정보수집·이용에 대한 동의를 거부할 권리가 있습니다.{' '}
                  <br />
                  거부 시 무료촬영 이벤트가 진행되지 않습니다. (일반촬영으로
                  진행){' '}
                </p>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  style={{
                    borderRadius: '0.625rem',
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    style={{ fontSize: '1.5rem' }}
                  >
                    <Grid item style={{ margin: '2.688rem 3.813rem' }}>
                      <div>성명</div>
                    </Grid>
                    <Grid item style={{ margin: '2.688rem 3.813rem' }}>
                      <Input
                        style={{ fontSize: '1.375rem' }}
                        value={form.name}
                        autoComplete="name"
                        disableUnderline
                        inputProps={{ style: { textAlign: 'right' } }}
                        name="name"
                        placeholder="이름을 입력해 주세요."
                        required
                        fullWidth
                        autoFocus
                        onChange={e =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  style={{
                    borderRadius: '0.625rem',
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    style={{ fontSize: '1.5rem' }}
                  >
                    <Grid item style={{ margin: '2.688rem 3.813rem' }}>
                      <div>출생연도</div>
                    </Grid>
                    <Grid item style={{ margin: '2.688rem 3.813rem' }}>
                      <Input
                        style={{ fontSize: '1.375rem' }}
                        value={form.birthDay}
                        autoComplete="birthday"
                        disableUnderline
                        inputProps={{ style: { textAlign: 'right' } }}
                        type="date"
                        name="birthday"
                        placeholder="출생연도를 선택해주세요."
                        required
                        fullWidth
                        autoFocus
                        onChange={e =>
                          setForm({ ...form, birthDay: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  style={{
                    borderRadius: '0.625rem',
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    style={{ fontSize: '1.5rem' }}
                  >
                    <Grid item style={{ margin: '2.688rem 3.813rem' }}>
                      <div>휴대폰 번호</div>
                    </Grid>
                    <Grid item style={{ margin: '2.688rem 3.813rem' }}>
                      <Input
                        style={{ fontSize: '1.375rem' }}
                        value={form.phone}
                        autoComplete="phone"
                        disableUnderline
                        inputProps={{ style: { textAlign: 'right' } }}
                        name="phone"
                        placeholder="휴대폰 번호를 입력해 주세요."
                        required
                        fullWidth
                        autoFocus
                        onChange={e =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  style={{
                    borderRadius: '0.625rem',
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    style={{ fontSize: '1.5rem' }}
                  >
                    <Grid item style={{ margin: '2.688rem 3.813rem' }}>
                      <span>성별</span>
                    </Grid>

                    <Grid item style={{ margin: '2.688rem 3.813rem' }}>
                      <FormControl component="fieldset">
                        <RadioGroup
                          classes={{ root: classes.root }}
                          name="gender"
                          value={form.gender}
                          onChange={e =>
                            setForm({ ...form, gender: e.target.value })
                          }
                        >
                          <FormControlLabel
                            value="male"
                            control={
                              <Radio
                                icon={
                                  <CheckCircleOutlineIcon
                                    style={{
                                      fill: '#30bbc3',
                                      fontSize: '3.125rem',
                                    }}
                                  />
                                }
                                checkedIcon={
                                  <CheckCircleIcon
                                    style={{
                                      fill: '#30bbc3',
                                      fontSize: '3.125rem',
                                    }}
                                  />
                                }
                              />
                            }
                            label="남자"
                          />
                          <FormControlLabel
                            value="female"
                            control={
                              <Radio
                                icon={
                                  <CheckCircleOutlineIcon
                                    style={{
                                      fill: '#30bbc3',
                                      fontSize: '3.125rem',
                                    }}
                                  />
                                }
                                checkedIcon={
                                  <CheckCircleIcon
                                    style={{
                                      fill: '#30bbc3',
                                      fontSize: '3.125rem',
                                    }}
                                  />
                                }
                              />
                            }
                            label="여자"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  style={{
                    borderRadius: '0.625rem',
                  }}
                >
                  <Grid
                    container
                    justify="space-between"
                    style={{ fontSize: '1.5rem' }}
                  >
                    <Grid item style={{ margin: '2.688rem 3.813rem' }}>
                      <div>이메일 주소</div>
                    </Grid>
                    <Grid item style={{ margin: '2.688rem 3.813rem' }}>
                      <Input
                        style={{ fontSize: '1.375rem' }}
                        value={form.email}
                        autoComplete="email"
                        disableUnderline
                        inputProps={{
                          style: { textAlign: 'right' },
                        }}
                        name="email"
                        placeholder="이메일을 입력해 주세요."
                        required
                        fullWidth
                        autoFocus
                        onChange={e =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <SignatureSpace
                  form={form}
                  setForm={setForm}
                  canvasRef={canvasRef}
                />
              </Grid>

              <Grid
                container
                justify="center"
                style={{ marginTop: '4rem', marginBottom: '2.188rem' }}
              >
                <Grid item>
                  <Button
                    classes={{ root: classes.bacgroundBtn }}
                    type="submit"
                    variant="contained"
                  >
                    제출하기
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />
    </>
  )
})

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f1eff0',
  },
  paper: {
    width: '48.75rem',
    marginTop: '3.45rem',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  form_label: {
    marginLeft: '8.438rem',
    fontSize: '1.625rem',
  },
  // 성별 입력 - FormGroup(override)
  root: {
    flexDirection: 'row',
  },
  bacgroundBtn: {
    borderRadius: '3.125rem',
    fontSize: '1.531rem',
    width: '10.375rem',
    height: '4.375rem',
    color: '#ffffff',
    backgroundColor: '#30bbc3',
  },
}))

export default Agreement
