import React, { useState, useRef, useCallback } from 'react'

import SignatureSpace from '../../components/SignatureSpace'
import { TextField, DateField, RadioField } from './Fields'
import Term from './Term'
import NoticeTable from './NoticeTable'

import userStore from '../../stores/userStore'

import { observer } from 'mobx-react-lite'

import { useHistory } from 'react-router-dom'

import { Container, Button, Grid, Paper, makeStyles } from '@material-ui/core'

import API from '../../api/index'

const initialFormData = {
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
  const [form, setForm] = useState(initialFormData)
  const classes = useStyles()
  const canvasRef = useRef(null)
  const history = useHistory()

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

    API.post('agreement/forms', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        if (res.status === 201) {
          alert('정상적으로 제출되었습니다. 감사합니다.')
          history.push('/studio')
        }
      })
      .catch(error => {
        alert('유효한 정보를 입력해주시기 바랍니다.')
        console.log(error)
      })
  }

  return (
    <>
      <Container className={classes.container} component="main">
        <div className={classes.paper}>
          <NoticeTable />

          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Term form={form} setForm={setForm} />

              <InputBox
                type="TextField"
                title="성명"
                name="name"
                value={form.name}
                placeholder="이름을 입력해 주세요."
                form={form}
                setForm={setForm}
              />

              <InputBox
                type="DateField"
                title="생년월일"
                name="birthday"
                value={form.birthday}
                form={form}
                setForm={setForm}
              />

              <InputBox
                type="TextField"
                title="휴대폰 번호"
                name="phone"
                value={form.phone}
                placeholder="휴대폰 번호를 입력해 주세요."
                form={form}
                setForm={setForm}
              />

              <InputBox
                type="RadioField"
                title="성별"
                name="gender"
                value={form.gender}
                form={form}
                setForm={setForm}
              />

              <InputBox
                type="TextField"
                title="이메일 주소"
                name="email"
                value={form.email}
                placeholder="이메일을 입력해 주세요."
                form={form}
                setForm={setForm}
              />

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

const InputBox = React.memo(
  ({ type, title, name, value, placeholder, form, setForm }) => {
    const classes = useStyles()

    const onChange = useCallback(
      event => {
        let {
          target: { name, value },
        } = event

        setForm({ ...form, [name]: value })
      },
      [form, setForm],
    )

    return (
      <Grid item md={12} xs={12}>
        <Paper className={classes.inputBox}>
          <Grid
            className={classes.inputBoxWrapper}
            container
            justify="space-evenly"
            alignItems="center"
          >
            <Grid className={classes.inputBoxTitle} item md={4} sm={4} xs={4}>
              <span>{title}</span>
            </Grid>
            <Grid
              className={classes.inputField}
              container
              justify="flex-end"
              item
              md={8}
              sm={8}
              xs={8}
            >
              {type === 'TextField' ? (
                <TextField
                  name={name}
                  value={value}
                  placeholder={placeholder}
                  onChange={onChange}
                />
              ) : null}

              {type === 'DateField' ? (
                <DateField form={form} setForm={setForm} />
              ) : null}

              {type === 'RadioField' ? (
                <RadioField form={form} onChange={onChange} />
              ) : null}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  },
)

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
  inputBox: {
    borderRadius: '0.625rem',
    fontSize: '1.5rem',
  },
  inputBoxWrapper: {
    height: '6.875rem',
  },
  inputBoxTitle: {
    textAlign: 'left',
    paddingLeft: '12%',

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.2rem',
      paddingLeft: '30px',
    },
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
