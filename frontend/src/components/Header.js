import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Button, Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import userStore from '../stores/userStore'
import { useHistory } from 'react-router-dom'

const Header = () => {
  const history = useHistory()
  return (
    <Grid container md={12} justify="space-between">
      <Button
        onClick={() => history.goBack()}
        style={{ marginLeft: '12.375rem', height: '133px' }}
        startIcon={<ArrowBackIosIcon />}
      >
        뒤로가기
      </Button>

      <Button
        style={{ marginRight: '12.375rem', height: '133px', width: '179px' }}
        onClick={() => userStore.logout()}
      >
        <Grid container direction="column">
          <span
            style={{
              fontSize: '1.625rem',
              color: '#30bbc3',
              fontFamily: 'NotoSansCJKkr',
            }}
          >
            hello {userStore.user.name}
          </span>
          <Typography>LOGOUT</Typography>
        </Grid>
      </Button>
    </Grid>
  )
}

export default Header
