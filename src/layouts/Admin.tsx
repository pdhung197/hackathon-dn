import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../components/Sidebar/Sidebar';

import routes from '../routes';

import dashboardStyle from '../assets/jss/covid-vaccine-manager/layouts/dashboardStyle';
import logo from 'assets/img/reactlogo.png';
import image from 'assets/img/sidebar-2.png';
import styled from 'styled-components';

const LogOutBtn = styled(Link)`
  background: none !important;
  outline: none !important;
  border: none !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/verify" />
  </Switch>
);

const useStyles = makeStyles(dashboardStyle);

export default function Admin({ ...rest }) {
  const classes = useStyles();

  const [color] = React.useState('blue');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== '/admin/maps';
  };

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={'BAG'}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel}>
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
        ) : (
          <div className={classes.map}>{switchRoutes}</div>
        )}
        <LogOutBtn to="/login">
          <img src={require('./../assets/img/logout.png')} alt="Log out" />
        </LogOutBtn>
      </div>
    </div>
  );
}
