import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch, Redirect } from 'react-router-dom'

import Admin from './layouts/Admin'
import Login from './layouts/Login'
import Register from './layouts/Register'
import RTL from './layouts/RTL'

import 'assets/css/material-dashboard-react.css?v=1.8.0'

import firebase, { config } from './firebase'
export const AuthContext = React.createContext({})

function App() {
  const hist = createBrowserHistory()
  const [isLoggedIn, setLoggedIn] = useState(false)

  function readSession() {
    const user = window.sessionStorage.getItem(
      `firebase:authUser:${config.apiKey}:[DEFAULT]`,
    )
    if (user) {
      setLoggedIn(true)
      console.log('login success', user)
    } else {
      console.log('login failed')
    }
  }
  useEffect(() => {
    readSession()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      <Router history={hist}>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
