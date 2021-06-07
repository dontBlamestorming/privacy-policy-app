import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'
import { Route, Switch } from 'react-router-dom'

import LoginForm from './pages/LoginForm'
import Agreement from './pages/Agreement'
import AgreementDetail from './pages/AgreementDetail'
import AgreementList from './pages/AgreementList'
import AdminHome from './pages/AdminHome'

import AuthRoute from './components/AuthRoute'
import Loading from './components/Loading'

import appStore from './stores/appStore'
import userStore from './stores/userStore'

// import { Grid } from '@material-ui/core'

import styled from 'styled-components'

const App = observer(() => {
  const [initialized, setInitialized] = useState(true)

  useEffect(() => {
    userStore.restore(() => setTimeout(() => setInitialized(true), 100))
  }, [])

  return !initialized ? (
    <Loading />
  ) : (
    <Body>
      <Switch>
        <Route exact path="/" render={props => <LoginForm {...props} />} />
        <AuthRoute
          path="/agreement"
          render={props => <Agreement {...props} />}
        />
        <AuthRoute
          exact
          path="/admin"
          render={props => <AdminHome {...props} />}
        />
        <AuthRoute
          path="/admin/agreements"
          render={props => <AgreementList {...props} />}
        />
        <AuthRoute
          path="/admin/agreement/detail"
          render={props => <AgreementDetail {...props} />}
        />
      </Switch>

      {appStore.isLoading && <Loading />}
    </Body>
  )
})

const Body = styled.div`
  // display: flex;
  // flex-direction: column;
  // @media (max-width: 960px) {
  //   min-height: 100vh;
  // }
  @media (max-width: 480px) {
    min-height: 100vh;
  }
`

export default App
