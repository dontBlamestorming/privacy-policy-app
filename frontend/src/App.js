import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'
import { Route, Switch } from 'react-router-dom'

import Header from './pages/Header'
import Footer from './pages/Footer'

import StudioHome from './pages/StudioHome'
import Agreement from './pages/Agreement/Agreement'
import AgreementList from './pages/AgreementList'
import AgreementDetail from './pages/AgreementDetail/AgreementDetail'
import LoginForm from './pages/LoginForm'

import AuthRoute from './components/AuthRoute'
import Loading from './components/Loading'

import userStore from './stores/userStore'

const App = observer(() => {
  const [initialized, setInitialized] = useState(true)

  useEffect(() => {
    userStore.restore(() => setTimeout(() => setInitialized(true), 100))
  }, [])

  return !initialized ? (
    <Loading />
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 15px)',
      }}
    >
      {userStore.user !== null ? <Header /> : null}

      <Switch>
        <Route exact path="/" render={props => <LoginForm {...props} />} />
        <AuthRoute
          exact
          path="/agreement"
          render={props => <Agreement {...props} />}
        />
        <AuthRoute
          exact
          path="/studio"
          render={props => <StudioHome {...props} />}
        />
        <AuthRoute
          exact
          path="/agreements"
          render={props => <AgreementList {...props} />}
        />
        <AuthRoute
          exact
          path="/studio/agreement/detail"
          render={props => <AgreementDetail {...props} />}
        />
        <Route
          path="/"
          render={props => <div>페이지를 찾을 수 없습니다.</div>}
        />
      </Switch>
      <Footer />
    </div>
  )
})

export default App
