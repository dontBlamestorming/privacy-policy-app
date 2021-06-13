import React from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  Grid,
  Hidden,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'

import styled from 'styled-components'

import logoDesktop from '../assets/footer_logo_desktop.png'
import logoMobile from '../assets/footer_logo_mobile.png'
import fbIcon from '../assets/sns_facebook.png'
import instaIcon from '../assets/sns_insta.png'
import twitIcon from '../assets/sns_twitter.png'
import naverIcon from '../assets/sns_naver.png'
import pintIcon from '../assets/sns_pinterest.png'

const Footer = () => {
  const classes = useStyles()
  const theme = useTheme()
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))

  return (
    <Container maxWidth="xl">
      <Grid container justify="center" className={classes.container}>
        <Grid
          className={classes.content}
          container
          item
          md={10}
          justify="space-evenly"
          alignItems="center"
        >
          {/* Logo */}
          <Grid container item md={3} sm={4}>
            <Grid item xs={8}>
              <Link to="/">{matchesXS ? <LogoMobile /> : <LogoDesktop />}</Link>
            </Grid>

            {/* Icons */}
            <Hidden mdUp>
              <Grid item className={classes.icons}>
                <SNSLinks />
              </Grid>
            </Hidden>
          </Grid>

          <Hidden smDown xsDown>
            <Grid item md={3}>
              <SNSLinks />
            </Grid>
          </Hidden>

          {/* Info */}
          <Hidden xsDown>
            <Grid item md={3} sm={5}>
              <Text>주식회사 써머캣</Text>
              <Text>사업자 등록번호 115-86-01644</Text>
              <Text>서울특별시 강남구 강남대로 310, 유니온센터 1003호</Text>
              <Text>대표|강예슬 정우철, 개인정보담당자|정우철</Text>

              <Hidden mdUp smDown xsDown>
                <Text>대표|강예슬, 정우철</Text>
                <Text>개인정보담당자|정우철</Text>
                <Text>
                  © 2019-2021. Summercat. Co.,Ltd. all rights reserved
                </Text>
              </Hidden>
            </Grid>
          </Hidden>

          {/* Notice */}
          <Grid className={classes.notice} item md={3} sm={3} xs={12}>
            <Hidden xsDown>
              <Text>이용약관</Text>
              <Text>개인정보취급방침</Text>
            </Hidden>

            <Hidden smUp>
              <Text>이용약관 | 개인정보취급방침 | info@summercat.co</Text>
              <Text>© 2019-2021. Summercat. Co.,Ltd. all rights reserved</Text>
            </Hidden>

            <Hidden xsDown>
              <Text>이메일|info@summercat.co</Text>
              <Text>TEL|(+82) 02-3453-7469</Text>
              <Text>FAX|(+82) 02-3453-7470</Text>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

const SNSLinks = () => (
  <>
    <Icon src={fbIcon} alt="페이스북 로고" />
    <Icon src={instaIcon} alt="인스타그램 로고" />
    <Icon src={twitIcon} alt="트위터 로고" />
    <Icon src={naverIcon} alt="네이버 블로그 로고" />
    <Icon src={pintIcon} alt="핀터레스트 로고" />
  </>
)

const LogoDesktop = React.memo(() => (
  <img src={logoDesktop} style={{ minWidth: '100%', maxWidth: '100%' }} />
))
const LogoMobile = React.memo(() => (
  <img src={logoMobile} style={{ minWidth: '100%', maxWidth: '100%' }} />
))

const Icon = styled.img`
  width: 1.313rem;
  height: 1.313rem;
  margin: 0.625rem;

  &:hover {
    filter: invert(59%) sepia(90%) saturate(498%) hue-rotate(163deg)
      brightness(104%) contrast(102%);
  }

  @media only screen and (max-width: 480px) {
    opacity: 0.7;
  }
`

const Text = styled.div`
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #767676;

  @media only screen and (max-width: 480px) {
    font-size: 0.688rem;
    color: #111e3f;
    opacity: 0.5;
  }
`

const useStyles = makeStyles(theme => ({
  container: {
    // border: '3px solid blue',
    height: '194px',
    backgroundColor: '#f1eff0',
    // marginTop: 'auto',

    [theme.breakpoints.down('sm')]: {
      height: '200px',
      backgroundColor: '#ffffff',
    },
  },
  content: {
    // paddingLeft: '39px',
    // paddingTop: '22px',
    // [theme.breakpoints.down('xs')]: {
    //   paddingLeft: '30px',
    //   paddingTop: '22px',
    // },
  },
  // icons: {
  //   [theme.breakpoints.down('sm')]: {
  //     paddingTop: '11px',
  //   },

  //   [theme.breakpoints.down('xs')]: {
  //     padding: '6px 0',
  //   },
  // },
  notice: {
    [theme.breakpoints.down('xs')]: {
      marginBottom: '35px',
    },
  },
}))

export default Footer
