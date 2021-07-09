import React, { useCallback } from 'react'

import { Grid, Paper, Radio, makeStyles } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const Term = React.memo(({ form, setForm }) => {
  const classes = useStyles()

  return (
    <>
      <Grid item md={12} xs={12}>
        <TermInputField
          name="collectingPrivacy"
          form={form}
          setForm={setForm}
          isChecked={form.collectingPrivacy}
          title="(필수) 개인정보 수집 및 이용동의"
        />
      </Grid>

      <Grid item md={12} xs={12}>
        <TermInputField
          name="providingPrivacy"
          form={form}
          setForm={setForm}
          isChecked={form.providingPrivacy}
          title="(필수) 제 3자(써머캣) 정보 제공 동의"
        />
      </Grid>

      <Grid item xs={12}>
        <p className={classes.noticeText}>
          ※ 위 개인정보수집·이용에 대한 동의를 거부할 권리가 있습니다. <br />
          거부 시 무료촬영 이벤트가 진행되지 않습니다. (일반촬영으로 진행){' '}
        </p>
      </Grid>
    </>
  )
})

const TermInputField = React.memo(
  ({ name, form, setForm, title, isChecked }) => {
    const classes = useStyles()

    const onClick = useCallback(
      event => {
        const {
          target: { name, value },
        } = event

        setForm({ ...form, [name]: !JSON.parse(value) })
      },
      [form, setForm],
    )

    return (
      <Paper className={classes.termsInputBox}>
        <Grid container justify="space-evenly">
          <Grid item md={2}>
            <Radio
              name={name}
              value={isChecked}
              icon={<CheckCircleOutlineIcon className={classes.inputBoxIcon} />}
              checkedIcon={<CheckCircleIcon className={classes.inputBoxIcon} />}
              required
              checked={isChecked}
              onClick={onClick}
            />
          </Grid>

          <Grid className={classes.form_label} item md={9}>
            <span>{title}</span>
          </Grid>
        </Grid>
      </Paper>
    )
  },
)

const useStyles = makeStyles(theme => ({
  termsInputBox: { backgroundColor: '#ffffff', borderRadius: '3.125rem' },
  inputBoxIcon: { fill: '#30bbc3', fontSize: '3.125rem' },
  form_label: {
    alignSelf: 'center',
    fontSize: '1.625rem',

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.3rem',
    },
  },
  noticeText: {
    textAlign: 'center',
    fontSize: '1.375rem',

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
    },
  },
}))

export default Term
