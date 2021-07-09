import React from 'react'

import { Grid, Paper, makeStyles } from '@material-ui/core/'

const NoticeTable = React.memo(() => {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.container}>
        <Grid container>
          <Grid className={classes.title} item xs>
            CR 스튜디오 개인정보 수집·이용 및 제 3자 제공 동의서
          </Grid>
          <Grid container>
            <Grid container style={{ marginTop: '1.563rem' }}>
              <NoticeCell
                title="제공받는 자"
                description={{ text: 'CR 스튜디오', _text: '써머캣' }}
              />

              <NoticeCell
                title="수집·이용 목적"
                description={{
                  text: '사진정보 : AI 사진보정연구',
                  _text: '파일전송',
                }}
              />
            </Grid>

            <Grid container style={{ marginTop: '1.563rem' }}>
              <NoticeCell
                title="수집·이용 항목"
                description={{ text: '사진정보', _text: '개인정보' }}
              />

              <NoticeCell
                title="보유 및 이용기간"
                description={{
                  text: '사진파일 제외 개인정보는 1년',
                  _text: 'AI 연구용 사진파일은 귀속',
                }}
              />
            </Grid>
          </Grid>

          <Grid item style={{ margin: '0 1.563rem 0 1.563rem' }}>
            <div className={classes.notice}>
              <p className={classes.notice_text}>
                CR 스튜디오에서 AI 사진 보정 연구용 샘플 수집을 위한 증명 &
                이미지 사진 무료 촬영 이벤트를 진행합니다. 다음과 같이
                개인정보를 수집·이용하고자 합니다. 내용을 읽은 후 동의 여부를
                결정하여 주십시오.
              </p>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
})

const NoticeCell = React.memo(({ title, description }) => {
  const { text, _text } = description
  const classes = useStyles()

  return (
    <Grid container justify="center" xs sm>
      <Grid item className={classes.subTitle}>
        <span className={classes.subTitle_text}>{title}</span>
      </Grid>
      <Grid item className={classes.description}>
        <span className={classes.description_text}>
          {text}
          <br />
          {_text}
        </span>
      </Grid>
    </Grid>
  )
})

const useStyles = makeStyles(theme => ({
  container: {
    borderRadius: '30px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    letterSpacing: '-0.041rem',
    color: '#000000',
    marginTop: '1.625rem',
    fontWeight: 'bold',

    [theme.breakpoints.down('xs')]: {
      fontSize: '1.5rem',
    },
  },
  subTitle: {
    marginTop: '1.25rem',
    backgroundColor: '#30bbc3',
    borderRadius: '1.129rem',
    width: '19.125rem',
  },
  subTitle_text: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '-0.6px',
    color: '#ffffff',
    lineHeight: '2.6rem',
  },
  description: {
    width: '19.125rem',
    marginTop: '1.188rem',
  },
  description_text: {
    fontSize: '1.375rem',
  },
  notice: {
    fontSize: '1.375rem',
    marginTop: '3.25rem',
  },
  notice_text: {
    lineHeight: 1.45,

    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
  },
}))

export default NoticeTable
