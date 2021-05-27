import React, { useEffect } from 'react'

import Header from '../components/Header'
import Footer from '../components/Footer'
import DataTable from '../components/DataTable'

import { observer } from 'mobx-react-lite'

import { Grid, Paper, Button } from '@material-ui/core'

import adminHomeMainImg from '../assets/admin_home_2x.png'

const AgreementList = observer(() => {
  return (
    <>
      <Header />
      <Grid container md={12} style={{ height: 'calc(1731px - 327px)' }}>
        <Grid item sm />

        <Grid container item sm={9} direction="column">
          <Grid item style={{ height: '12.25rem' }}>
            <Paper
              style={{
                backgroundImage: `url(${adminHomeMainImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            >
              <Grid container item justify="center">
                <Button
                  style={{
                    width: '23.688rem',
                    height: '11.875rem',
                    color: '#ffffff',
                    fontSize: '2.188rem',
                    backgroundColor: '#30bbc3',
                    borderRadius: '1.25rem',
                    fontWeight: 'bold',
                    marginRight: '4.5rem',
                    marginTop: '6rem',
                  }}
                >
                  동의서 보기
                </Button>

                <Button
                  style={{
                    width: '23.688rem',
                    height: '11.875rem',
                    color: '#ffffff',
                    fontSize: '2.188rem',
                    backgroundColor: '#30bbc3',
                    borderRadius: '1.25rem',
                    fontWeight: 'bold',
                    marginLeft: '4.5rem',
                    marginTop: '6rem',
                  }}
                >
                  개인정보이용동의서
                </Button>
              </Grid>
            </Paper>
          </Grid>

          <Grid
            container
            item
            justify="center"
            style={{
              backgroundColor: '#f1eff0',
              height: 'calc( 98% - 12.25rem)',
            }}
          >
            <Grid
              item
              style={{
                width: '68.125rem',
                height: '100%',
              }}
            >
              <div
                style={{
                  height: '42.813rem',
                  borderRadius: '0.625rem',
                  marginTop: '2.625rem',
                }}
              >
                <DataTable />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm />
      </Grid>
      <Footer />
    </>
  )
})

export default AgreementList
