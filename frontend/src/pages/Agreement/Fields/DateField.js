import React, { useState } from 'react'

import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { makeStyles, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'

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
    <ThemeProvider theme={theme}>
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
          inputProps={{ style: { textAlign: 'right' } }}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  )
}

const useStyles = makeStyles(theme => ({
  inputField: {
    paddingRight: '20%',

    [theme.breakpoints.down('xs')]: {
      paddingRight: '25%',
    },
  },
}))

const theme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#30bbc3',
      },
    },
    MuiPickersDay: {
      daySelected: {
        backgroundColor: '#30bbc3',
        '&:before': {
          backgroundColor: '#30bbc3',
        },
        '&:hover': {
          backgroundColor: '#30bbc3',
        },
        '&:after': {
          backgroundColor: '#30bbc3',
        },
      },
    },
    MuiPickersYear: {
      root: {
        fontSize: '1.3rem',
      },
      yearSelected: {
        color: '#30bbc3',
      },
    },
    MuiPickersMonth: {
      root: {
        fontSize: '1.3rem',
      },
      monthSelected: {
        color: '#30bbc3',
      },
    },
    MuiButton: {
      label: {
        color: '#30bbc3',
      },
    },
    MuiInput: {
      root: {
        fontSize: '1.2rem',
      },
      underline: {
        '&:before': {
          borderBottom: 'none',
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: 'none',
        },
        '&:after': {
          borderBottom: 'none',
        },
      },
    },
  },
})

export default DateField
