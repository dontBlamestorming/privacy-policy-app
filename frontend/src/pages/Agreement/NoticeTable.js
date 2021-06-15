import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core/'

const NoticeTable = () => {
  const classes = useStyles()

  return (
    <>
      <Paper className={classes.container}>
        <Grid container>
          <Grid className={classes.title} item xs>
            CR 스튜디오 개인정보 수집·이용 및 제 3자 제공 동의서
          </Grid>
          <Grid container>
            {/* Line 2 */}
            <Grid container style={{ marginTop: '1.563rem' }}>
              <Grid container justify="center" xs sm>
                <Grid item className={classes.subTitle}>
                  <span className={classes.subTitle_text}>제공받는 자</span>
                </Grid>
                <Grid item className={classes.description}>
                  <span className={classes.description_text}>
                    CR스튜디오
                    <br />
                    써머캣
                  </span>
                </Grid>
              </Grid>

              <Grid container justify="center" xs sm>
                <Grid item className={classes.subTitle}>
                  <span className={classes.subTitle_text}>수집·이용 목적</span>
                </Grid>
                <Grid item className={classes.description}>
                  <span className={classes.description_text}>
                    사진정보 : AI 사진보정연구
                    <br />
                    파일전송
                  </span>
                </Grid>
              </Grid>
            </Grid>

            {/* Line 3 */}
            <Grid container style={{ marginTop: '1.563rem' }}>
              <Grid container justify="center" xs sm>
                <Grid item className={classes.subTitle}>
                  <span className={classes.subTitle_text}>수집·이용 항목</span>
                </Grid>
                <Grid item className={classes.description}>
                  <span className={classes.description_text}>
                    사진정보
                    <br />
                    개인정보
                  </span>
                </Grid>
              </Grid>

              <Grid container justify="center" xs sm>
                <Grid item className={classes.subTitle}>
                  <span className={classes.subTitle_text}>
                    보유 및 이용기간
                  </span>
                </Grid>
                <Grid item className={classes.description}>
                  <span className={classes.description_text}>
                    사진파일 제외 개인정보는 1년
                    <br />
                    AI 연구용 사진파일은 귀속
                  </span>
                </Grid>
              </Grid>
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

          <Grid container></Grid>
        </Grid>
      </Paper>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    borderRadius: '30px',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.90rem',
    letterSpacing: '-0.041rem',
    color: '#000000',
    marginTop: '1.625rem',
    fontWeight: 'bold',
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
  },
}))

export default NoticeTable
