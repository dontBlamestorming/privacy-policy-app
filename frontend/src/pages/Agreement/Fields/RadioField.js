import React from 'react'

import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
} from '@material-ui/core'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const RadioField = ({ form, onChange }) => {
  const classes = useStyles()

  return (
    <FormControl component="fieldset" className={classes.inputField}>
      <RadioGroup
        classes={{ root: classes.root }}
        name="gender"
        value={form.gender}
        onChange={onChange}
      >
        <FormControlLabel
          value="male"
          control={
            <Radio
              icon={<CheckCircleOutlineIcon className={classes.inputBoxIcon} />}
              checkedIcon={<CheckCircleIcon className={classes.inputBoxIcon} />}
            />
          }
          label="남자"
        />
        <FormControlLabel
          value="female"
          control={
            <Radio
              icon={<CheckCircleOutlineIcon className={classes.inputBoxIcon} />}
              checkedIcon={<CheckCircleIcon className={classes.inputBoxIcon} />}
            />
          }
          label="여자"
        />
      </RadioGroup>
    </FormControl>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: 'row',
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
}))

export default RadioField
