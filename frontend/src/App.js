import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react-lite'
import { Router, Route, Switch } from 'react-router-dom'

import LoginForm from './pages/LoginForm'
import Agreement from './pages/Agreement'
import AgreementDetail from './pages/AgreementDetail'
import AgreementList from './pages/AgreementList'
import AdminHome from './pages/AdminHome'

// import Header from './components/Header';
import AuthRoute from './components/AuthRoute'
import Loading from './components/Loading'

import appStore from './stores/appStore'
import userStore from './stores/userStore'

const App = observer(() => {
  const [initialized, setInitialized] = useState(true)

  useEffect(() => {
    userStore.restore(() => setTimeout(() => setInitialized(true), 100))
  }, [])

  return !initialized ? (
    <Loading />
  ) : (
    <div className="App">
      <Switch>
        <Route exact path="/" render={props => <LoginForm {...props} />} />
        <AuthRoute path="/form" render={props => <Agreement {...props} />} />
        <AuthRoute path="/manager" render={props => <AdminHome {...props} />} />
        <AuthRoute
          path="/detail"
          render={props => <AgreementDetail {...props} />}
        />
        <AuthRoute
          path="/list"
          render={props => <AgreementList {...props} />}
        />
        <AuthRoute
          path="/list"
          render={props => <AgreementList {...props} />}
        />
      </Switch>
      {appStore.isLoading && <Loading />}
    </div>
  )
})

export default App
