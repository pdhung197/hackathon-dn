import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import Admin from './layouts/Admin';
import Login from './layouts/Login';
import Register from './layouts/Register';

import 'assets/css/covid-vaccine-manager.css?v=1.8.0';

import { Proof } from './views/Proof/Proof';
import restClient from './services/rest-client';
import { VaccinationCheck } from './views/VaccinationCheck/VaccinationCheck';

interface IAuthContext {
  isLoggedIn?: boolean;
  setAuthData: (token: string) => void;
  token?: string;
}

export const AuthContext = React.createContext<IAuthContext>({
  setAuthData: () => {},
});

function App() {
  const hist = createBrowserHistory();

  const setAuthData = (token: string) => {
    restClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    window.localStorage.setItem('token', token);
  };

  function readSession() {
    const token = window.localStorage.getItem('token');
    token && setAuthData(token);
  }
  useEffect(() => {
    readSession();
  }, [readSession]);

  return (
    <AuthContext.Provider value={{ setAuthData }}>
      <Router history={hist}>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/check" component={VaccinationCheck} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
