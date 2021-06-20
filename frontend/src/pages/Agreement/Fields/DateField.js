import React, { useState } from 'react'

import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { makeStyles } from '@material-ui/core'

import DateFnsUtils from '@date-io/date-fns'
import ko from 'date-fns/locale/ko'

const DateField = ({ form, setForm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const classes = useStyles()

  const changeDate = value => {
    const year = value.getFullYear()
    const month = ('0' + (1 + value.getMonth())).slice(-2)
    const day = ('0' + value.getDate()).slice(-2)
    setForm({
      ...form,
      birthday: `${year}-${month}-${day}`,
    })

    setSelectedDate(value)
  }

  return (
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
  )
}

const useStyles = makeStyles(theme => ({
  inputField: {
    textAlign: 'right',
    paddingRight: '60px',
    fontSize: '1.375rem',

    [theme.breakpoints.down('sm')]: {
      paddingRight: '10px',
    },
  },
}))

export default DateField
