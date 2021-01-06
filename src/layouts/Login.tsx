import React, { useState, ReactElement, useContext } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../index';
import { useHistory, withRouter } from 'react-router-dom';
import restClient from '../services/rest-client';
import { get } from 'lodash';
import bgImage from '../assets/img/bg.jpg';
import logoOwt from '../assets/img/owt-logo.svg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Open Web Technology
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login = (): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const Auth = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleForm = (e: any): void => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    restClient
      .post('/api/auth', {
        username: email,
        password,
      })
      .then(res => {
        if (res.data.token) {
          Auth.setAuthData(res.data.token);
          history.replace('/admin/verify');
        }
      })
      .catch(error => {
        const errMsg = get(error, 'response.data');
        errMsg && setError(errMsg);
      });
  };

  return (
    <Grid container={true} component="main" className={classes.root}>
      <CssBaseline />
      <Grid item={true} xs={false} sm={4} md={7} className={classes.image} />
      <Grid
        item={true}
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square={true}
      >
        <div className={classes.paper}>
          <img src={logoOwt} alt="owt" />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate={true}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              placeholder="Username"
              name="username"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth={true}
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <p className={classes.error}>{error}</p>
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              onClick={e => handleForm(e)}
            >
              Sign in
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: '#ef4444',
    margin: 20,
    textAlign: 'center',
  },
}));

export default withRouter(Login);
