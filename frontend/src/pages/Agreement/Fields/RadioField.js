import React from 'react'

import {
  Radio as _Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  makeStyles,
} from '@material-ui/core'

import styled from 'styled-components'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const RadioField = ({ form, onChange }) => {
  return (
    <>
      <Container>
        <FormControl component="fieldset" required>
          <RadioGroup row name="gender" value={form.gender} onChange={onChange}>
            <FormControlLabel value="male" control={<Radio />} label="남자" />
            <FormControlLabel value="female" control={<Radio />} label="여자" />
          </RadioGroup>
        </FormControl>
      </Container>
    </>
  )
}

const Radio = React.memo(props => {
  const classes = useStyles()

  return (
    <_Radio
      {...props}
      className={classes.root}
      icon={<CheckCircleOutlineIcon className={classes.icon} />}
      checkedIcon={<CheckCircleIcon className={classes.icon} />}
    />
  )
})

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: '30px',

    [theme.breakpoints.down('xs')]: {
      marginLeft: '10px',
    },
  },
  icon: {
    fill: '#30bbc3',
    fontSize: '3.125rem',

    [theme.breakpoints.down('xs')]: {
      fontSize: '2.8rem',
    },
  },
}))

const Container = styled.div`
  padding-right: 20%;
`

export default RadioField
