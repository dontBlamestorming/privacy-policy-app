import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  title: {
    height: '2.063rem',
    fontSize: '1.80rem',
    letterSpacing: '-0.041rem',
    color: '#000000',
    marginTop: '1.625rem',
    fontWeight: 'bold',
  },
  subTitle: {
    backgroundColor: '#30bbc3',
    borderRadius: '1.129rem',
    width: '19.125rem',
    marginLeft: '4.688rem',
    marginRight: '1.125rem',
  },
  subTitle_text: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '-0.6px',
    color: '#ffffff',
    lineHeight: '2.6rem',
  },
  description: {
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

const NoticeTable = () => {
  const classes = useStyles()

  return (
    <>
      <Paper
        square={true}
        style={{
          borderRadius: '50px',
          textAlign: 'center',
        }}
      >
        <Grid container>
          <Grid item xs={12} className={classes.title}>
            ■ CR 스튜디오 개인정보 수집·이용 및 제 3자 제공 동의서
          </Grid>
          <Grid container style={{ marginTop: '1.563rem' }}>
            <Grid item xs={12} sm={6}>
              <div className={classes.subTitle}>
                <span className={classes.subTitle_text}>제공받는 자</span>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div
                className={classes.subTitle}
                style={{ marginLeft: '1rem', marginRight: 0 }}
              >
                <span className={classes.subTitle_text}>수집·이용 목적</span>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div
              className={classes.description}
              style={{ paddingLeft: '3.875rem' }}
            >
              <span className={classes.description_text}>CR스튜디오</span>
              <br />
              <span className={classes.description_text}>써머캣</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div
              className={classes.description}
              style={{ paddingRight: '2.75rem' }}
            >
              <span className={classes.description_text}>
                사진정보 : AI 사진보정연구
              </span>
              <br />
              <span className={classes.description_text}>파일전송</span>
            </div>
          </Grid>

          <Grid container style={{ marginTop: '1.563rem' }}>
            <Grid item xs={12} sm={6}>
              <div className={classes.subTitle}>
                <span className={classes.subTitle_text}>수집·이용 항목</span>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <div
                className={classes.subTitle}
                style={{ marginLeft: '1rem', marginRight: 0 }}
              >
                <span className={classes.subTitle_text}>보유 및 이용기간</span>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div
              className={classes.description}
              style={{ paddingLeft: '3.875rem' }}
            >
              <span className={classes.description_text}>사진정보</span>
              <br />
              <span className={classes.description_text}>개인정보</span>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div
              className={classes.description}
              style={{ paddingRight: '2.75rem' }}
            >
              <span className={classes.description_text}>
                사진파일 제외 개인정보는 1년
              </span>
              <br />
              <span className={classes.description_text}>
                AI 연구용 사진파일은 귀속
              </span>
            </div>
          </Grid>

          <Grid item xs={12} style={{ margin: '0 1.563rem 0 1.563rem ' }}>
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
}

export default NoticeTable
