import React, { useState, useRef } from 'react'

import SignatureSpace from '../../components/SignatureSpace'
import NoticeTable from './NoticeTable'

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

import DateFnsUtils from '@date-io/date-fns'
import ko from 'date-fns/locale/ko'

import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import { observer } from 'mobx-react-lite'

import userStore from '../../stores/userStore'

import API from '../../api/index'

const initialForm = {
  name: '',
  email: '',
  gender: '',
  birthday: '',
  phone: '',
  signature: null,
  collectingPrivacy: false,
  providingPrivacy: false,
}

const Agreement = observer(() => {
  const [form, setForm] = useState(initialForm)
  const [selectedDate, handleDateChange] = useState(new Date())
  const classes = useStyles()
  const canvasRef = useRef(null)

  const onSubmit = e => {
    e.preventDefault()

    if (!form.collectingPrivacy || !form.providingPrivacy) {
      alert('개인정보 수집이용 및 정보제공 동의를 부탁드립니다.')
      return
    } else if (!form.signature) {
      alert('서명은 필수입니다.')
      return
    }

    const data = new FormData()

    data.append('receiver', userStore.user.id)
    data.append('studio', userStore.user.studio_id)
    data.append('name', form.name)
    data.append('email', form.email)
    data.append('gender', form.gender)
    data.append('birthday', form.birthday)
    data.append('phone', form.phone)
    data.append('sign', form.signature, 'sign.png')

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

  const changeDate = value => {
    const year = value.getFullYear()
    const month = ('0' + (1 + value.getMonth())).slice(-2)
    const day = ('0' + value.getDate()).slice(-2)
    setForm({
      ...form,
      birthday: `${year}-${month}-${day}`,
    })
    handleDateChange(value)
  }

  return (
    <>
      <Container className={classes.container} component="main">
        <div className={classes.paper}>
          <NoticeTable />

          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              {/* 동의조항 1 */}
              <Grid item md={12} xs={12}>
                <Paper className={classes.termsInputBox}>
                  <Grid container justify="space-evenly">
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

                    <Grid className={classes.form_label} item md={9}>
                      <span>(필수) 개인정보 수집 및 이용동의</span>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* 동의조항 2 */}
              <Grid item md={12} xs={12}>
                <Paper className={classes.termsInputBox}>
                  <Grid container justify="space-evenly">
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

                    <Grid className={classes.form_label} item md={9}>
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
              <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.inputBox}>
                  <Grid
                    className={classes.inputBoxWrapper}
                    container
                    justify="space-evenly"
                    alignItems="center"
                  >
                    <Grid
                      className={classes.inputBoxTitle}
                      item
                      md={4}
                      sm={4}
                      xs={4}
                    >
                      <span>성명</span>
                    </Grid>
                    <Grid item md={8} sm={8} xs={8}>
                      <Input
                        className={classes.inputField}
                        value={form.name}
                        autoComplete="name"
                        disableUnderline
                        name="name"
                        placeholder="이름을 입력해 주세요."
                        required
                        onChange={e =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* 생년월일 */}
              <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.inputBox}>
                  <Grid
                    className={classes.inputBoxWrapper}
                    container
                    justify="space-evenly"
                    alignItems="center"
                  >
                    <Grid
                      className={classes.inputBoxTitle}
                      item
                      md={4}
                      sm={4}
                      xs={4}
                    >
                      <span>생년월일</span>
                    </Grid>
                    <Grid item md={8} sm={8} xs={8}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ko}>
                        <DatePicker
                          className={classes.inputField}
                          disableFuture
                          inputVariant="standard"
                          openTo="year"
                          format="yyyy/MM/dd"
                          views={['year', 'month', 'date']}
                          value={selectedDate}
                          onChange={changeDate}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              {/* 휴대폰 번호 */}
              <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.inputBox}>
                  <Grid
                    className={classes.inputBoxWrapper}
                    container
                    justify="space-evenly"
                    alignItems="center"
                  >
                    <Grid
                      className={classes.inputBoxTitle}
                      item
                      md={4}
                      sm={4}
                      xs={4}
                    >
                      <span>휴대폰 번호</span>
                    </Grid>
                    <Grid item md={8} sm={8} xs={8}>
                      <Input
                        className={classes.inputField}
                        value={form.phone}
                        autoComplete="phone"
                        disableUnderline
                        name="phone"
                        placeholder="휴대폰 번호를 입력해 주세요."
                        required
                        onChange={e =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              {/* 성별 */}
              <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.inputBox}>
                  <Grid
                    className={classes.inputBoxWrapper}
                    container
                    justify="space-evenly"
                    alignItems="center"
                  >
                    <Grid
                      className={classes.inputBoxTitle}
                      item
                      md={4}
                      sm={4}
                      xs={4}
                    >
                      <span>성별</span>
                    </Grid>

                    <Grid item md={8} sm={8} xs={8}>
                      <FormControl
                        component="fieldset"
                        className={classes.inputField}
                      >
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
              <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.inputBox}>
                  <Grid
                    className={classes.inputBoxWrapper}
                    container
                    justify="space-evenly"
                    alignItems="center"
                  >
                    <Grid
                      className={classes.inputBoxTitle}
                      item
                      md={4}
                      sm={4}
                      xs={4}
                    >
                      <span>이메일 주소</span>
                    </Grid>
                    <Grid item md={8} sm={8} xs={8}>
                      <Input
                        className={classes.inputField}
                        value={form.email}
                        autoComplete="email"
                        disableUnderline
                        name="email"
                        placeholder="이메일을 입력해 주세요."
                        required
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
                  >
                    제출하기
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
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
  inputBox: {
    borderRadius: '0.625rem',
    fontSize: '1.5rem',
  },
  inputBoxWrapper: {
    height: '6.875rem',
  },
  inputBoxTitle: {
    textAlign: 'left',
    paddingLeft: '60px',

    [theme.breakpoints.down('xs')]: {
      paddingLeft: '30px',
    },
  },
  inputField: {
    textAlign: 'right',
    paddingRight: '60px',
    fontSize: '1.375rem',

    [theme.breakpoints.down('sm')]: {
      paddingRight: '10px',
    },
  },
  inputBoxIcon: { fill: '#30bbc3', fontSize: '3.125rem' },

  form_label: {
    alignSelf: 'center',
    fontSize: '1.625rem',
  },
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
