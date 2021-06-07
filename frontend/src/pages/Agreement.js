import React, { useState, useRef } from 'react'

import Header from '../components/Header'
import SignatureSpace from '../components/SignatureSpace'
import NoticeTable from '../components/NoticeTable'
import Footer from '../components/Footer'

import { makeStyles } from '@material-ui/core/styles'

import {
  Container,
  Hidden,
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
  console.log('BirthDay', form.birthDay)
  const classes = useStyles()
  const canvasRef = useRef(null)

  const onSubmit = e => {
    e.preventDefault()

    const data = new FormData()

    data.append('receiver', userStore.user.id)
    data.append('studio', userStore.user.studio_id)
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('gender', form.gender)
    data.append('birthDay', form.birthDay)
    data.append('phone', form.phone)
    data.append('sign', form.signature, 'sign.png')

    console.log('DATA', data.get('birthday'))

    API.post('/forms', data, {
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
              {/* 동의조항 1 */}
              <Grid item xs>
                <Paper className={classes.termsInputBox}>
                  <Grid container justify="center">
                    <Grid item md={2}>
                      <Radio
                        icon={
                          <CheckCircleOutlineIcon
                            className={classes.inputBoxIcon}
                          />
                        }
                        checkedIcon={
                          <CheckCircleIcon className={classes.inputBoxIcon} />
                        }
                        required
                        checked={form.collectingPrivacy}
                        onClick={e =>
                          setForm({
                            ...form,
                            collectingPrivacy: !form.collectingPrivacy,
                          })
                        }
                      />
                    </Grid>

                    <Grid className={classes.form_label} item md={10}>
                      <span>(필수) 개인정보 수집 및 이용동의</span>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* 동의조항 2 */}
              <Grid item xs={12}>
                <Paper className={classes.termsInputBox}>
                  <Grid container justify="center">
                    <Grid item md={2}>
                      <Radio
                        icon={
                          <CheckCircleOutlineIcon
                            className={classes.inputBoxIcon}
                          />
                        }
                        checkedIcon={
                          <CheckCircleIcon className={classes.inputBoxIcon} />
                        }
                        required
                        checked={form.providingPrivacy}
                        onClick={e =>
                          setForm({
                            ...form,
                            providingPrivacy: !form.providingPrivacy,
                          })
                        }
                      />
                    </Grid>

                    <Grid className={classes.form_label} item md={10}>
                      <span>(필수) 제 3자(써머캣) 정보 제공 동의</span>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* Terms Notice */}
              <Grid item xs={12}>
                <p style={{ textAlign: 'center', fontSize: '1.375rem' }}>
                  ※ 위 개인정보수집·이용에 대한 동의를 거부할 권리가 있습니다.{' '}
                  <br />
                  거부 시 무료촬영 이벤트가 진행되지 않습니다. (일반촬영으로
                  진행){' '}
                </p>
              </Grid>

              {/* 이름 Input Box */}
              <Grid item xs={12}>
                <Paper className={classes.infoInputBox}>
                  <Grid
                    className={classes.infoInputWrapper}
                    container
                    alignItems="center"
                  >
                    <Grid item md={4} style={{ paddingRight: '100px' }}>
                      <span>성명</span>
                    </Grid>
                    <Grid item md={8}>
                      <Input
                        style={{ fontSize: '1.375rem' }}
                        value={form.name}
                        autoComplete="name"
                        disableUnderline
                        name="name"
                        placeholder="이름을 입력해 주세요."
                        required
                        autoFocus
                        onChange={e =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* 출생연도 */}
              <Grid item xs={12}>
                <Paper className={classes.infoInputBox}>
                  <Grid
                    className={classes.infoInputWrapper}
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item md={4}>
                      <span>출생연도</span>
                    </Grid>
                    <Grid item md={8}>
                      <Input
                        style={{ fontSize: '1.375rem' }}
                        value={form.birthDay}
                        autoComplete="birthDay"
                        disableUnderline
                        type="date"
                        name="birthDay"
                        placeholder="출생연도를 선택해주세요."
                        required
                        autoFocus
                        onChange={e =>
                          setForm({ ...form, birthDay: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* 휴대폰 번호 */}
              <Grid item xs={12}>
                <Paper className={classes.infoInputBox}>
                  <Grid
                    className={classes.infoInputWrapper}
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item md={4}>
                      <span>휴대폰 번호</span>
                    </Grid>
                    <Grid item md={8}>
                      <Input
                        style={{ fontSize: '1.375rem' }}
                        value={form.phone}
                        autoComplete="phone"
                        disableUnderline
                        name="phone"
                        placeholder="휴대폰 번호를 입력해 주세요."
                        required
                        autoFocus
                        onChange={e =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* 성별 */}
              <Grid item xs={12}>
                <Paper className={classes.infoInputBox}>
                  <Grid
                    className={classes.infoInputWrapper}
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item md={4}>
                      <span>성별</span>
                    </Grid>

                    <Grid item md={8}>
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
                                    className={classes.inputBoxIcon}
                                  />
                                }
                                checkedIcon={
                                  <CheckCircleIcon
                                    className={classes.inputBoxIcon}
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
                                    className={classes.inputBoxIcon}
                                  />
                                }
                                checkedIcon={
                                  <CheckCircleIcon
                                    className={classes.inputBoxIcon}
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

              {/* 이메일 주소 */}
              <Grid item xs={12}>
                <Paper className={classes.infoInputBox}>
                  <Grid
                    className={classes.infoInputWrapper}
                    container
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item md={4}>
                      <span>이메일 주소</span>
                    </Grid>
                    <Grid item md={8}>
                      <Input
                        style={{ fontSize: '1.375rem' }}
                        value={form.email}
                        autoComplete="email"
                        disableUnderline
                        name="email"
                        placeholder="이메일을 입력해 주세요."
                        required
                        autoFocus
                        onChange={e =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* 싸인 스페이스 */}
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
                    classes={{ root: classes.backgroundBtn }}
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

    [theme.breakpoints.up('md')]: {
      marginBottom: '10.625rem',
    },
  },
  paper: {
    width: '48.75rem',
    marginTop: '3.45rem',
    textAlign: 'center',
  },
  form: {
    marginTop: theme.spacing(3),
  },
  termsInputBox: { backgroundColor: '#ffffff', borderRadius: '3.125rem' },
  infoInputBox: {
    // height: '6.875rem',
    borderRadius: '0.625rem',
    fontSize: '1.5rem',
  },
  infoInputWrapper: {
    height: '6.875rem',
  },
  inputBoxIcon: { fill: '#30bbc3', fontSize: '3.125rem' },

  form_label: {
    // marginLeft: '8.438rem',
    alignSelf: 'center',
    fontSize: '1.625rem',
  },
  // 성별 입력 - FormGroup(override)
  root: {
    flexDirection: 'row',
  },
  backgroundBtn: {
    borderRadius: '3.125rem',
    fontSize: '1.531rem',
    width: '10.375rem',
    height: '4.375rem',
    color: '#ffffff',
    backgroundColor: '#30bbc3',
  },
}))

export default Agreement
