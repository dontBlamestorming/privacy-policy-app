import React from 'react'

import {
  Radio as _Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  makeStyles,
  Grid,
} from '@material-ui/core'

import styled from 'styled-components'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

const RadioField = ({ form, onChange }) => {
  return (
    <>
      <Container>
        <FormControl component="fieldset" required>
          <RadioGroup name="gender" value={form.gender} onChange={onChange}>
            <Grid container justify="center">
              <Grid item>
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="남자"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="여자"
                />
              </Grid>
            </Grid>
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
  width: 100%;
  padding-left: 10%;
`

export default RadioField
