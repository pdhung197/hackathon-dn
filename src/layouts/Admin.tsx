import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import 'perfect-scrollbar/css/perfect-scrollbar.css';
import { makeStyles } from '@material-ui/core/styles';
import Sidebar from '../components/Sidebar/Sidebar';

import routes from '../routes';

import dashboardStyle from '../assets/jss/covid-vaccine-manager/layouts/dashboardStyle';
import logo from 'assets/img/reactlogo.png';
import image from 'assets/img/sidebar-2.png';

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
      </div>
    </div>
  );
}
