import React from 'react'
import { Link } from 'react-router-dom'

import { Grid } from '@material-ui/core'
import { Container } from '@material-ui/core'
import styled from 'styled-components'

import logoDesktop from '../assets/footer_logo_desktop.png'
import fbIcon from '../assets/sns_facebook.png'
import instaIcon from '../assets/sns_insta.png'
import twitIcon from '../assets/sns_twitter.png'
import naverIcon from '../assets/sns_naver.png'
import pintIcon from '../assets/sns_pinterest.png'

const Footer = () => {
  return (
    <Grid
      container
      item
      md={12}
      style={{ height: '194px', backgroundColor: '#f1eff0' }}
    >
      <Grid item sm />

      <Grid container item sm={9} alignItems="center">
        <Grid item container sm={2} alignItems="center">
          <Link to="/">
            <LogoDesktop />
          </Link>
        </Grid>

        <Grid
          item
          container
          sm={4}
          alignItems="center"
          style={{ padding: '0 4%' }}
        >
          <SNSLinks />
        </Grid>

        <Grid item sm={4}>
          <Text>주식회사 써머캣</Text>
          <Text>사업자 등록번호 115-86-01644</Text>
          <Text>서울특별시 강남구 강남대로 310, 유니온센터 1003호</Text>
          <Text>대표 | 강예슬, 정우철</Text>
          <Text>개인정보담당자 | 정우철</Text>
          <Text>© 2019-2021. Summercat. Co.,Ltd. all rights reserved.</Text>
        </Grid>

        <Grid item sm={2}>
          <div style={{ width: 200, marginLeft: 'auto' }}>
            <Text>이용약관</Text>
            <Text>개인정보취급방침</Text>

            <Grid container>
              <Text>이메일</Text>
              <Text style={{ margin: '0 5px' }}>|</Text>
              <Text>info@summercat.co</Text>
            </Grid>

            <Text>TEL | (+82) 02-3453-7469'</Text>
            <Text>FAX | (+82) 02-3453-7470'</Text>
          </div>
        </Grid>
      </Grid>

      <Grid item sm />
    </Grid>
  )
}

const LogoDesktop = () => (
  <img
    src={logoDesktop}
    alt="돼랑이"
    style={{ minWidth: '100%', maxWidth: '100%' }}
  />
)

const SNSLinks = () => (
  <>
    <Icon src={fbIcon} alt="페이스북 로고" />
    <Icon src={instaIcon} alt="인스타그램 로고" />
    <Icon src={twitIcon} alt="트위터 로고" />
    <Icon src={naverIcon} alt="네이버 블로그 로고" />
    <Icon src={pintIcon} alt="핀터레스트 로고" />
  </>
)

const Icon = styled.img`
  width: 21px;
  height: 21px;
  margin: 10px;
`

const Text = styled.div`
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #767676;
`

export default Footer
