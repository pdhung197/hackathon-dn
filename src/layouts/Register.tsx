import React, { useState, ReactElement } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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
}));

const Register = ({ history }: any): ReactElement => {
  const classes = useStyles();

  const initialState = {
    firstName: '',
    lastName: '',
    username: '',
    emailAddress: '',
    password: '',
    passwordConfirmation: '',
    errors: '',
  };

  const [state, setState] = useState(initialState);

  const handleInputChange = (event: any): void => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const handleForm = (e: any): void => {
    e.preventDefault();
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
          <Avatar className={classes.avatar}>
            <DirectionsBusIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <form className={classes.form} noValidate={true}>
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth={true}
              id="emailAddress"
              label="Email Address"
              name="emailAddress"
              autoComplete="emailAddress"
              type="email"
              autoFocus={true}
              value={state.emailAddress}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth={true}
              label="First Name"
              id="firstName"
              name="firstName"
              autoComplete="firstName"
              autoFocus={true}
              value={state.firstName}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth={true}
              label="Last Name"
              id="lastName"
              name="lastName"
              autoComplete="lastName"
              autoFocus={true}
              value={state.lastName}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth={true}
              label="username"
              id="username"
              name="username"
              autoComplete="username"
              autoFocus={true}
              value={state.username}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth={true}
              name="password"
              label="Password"
              type="password"
              id="new-password"
              autoComplete="new-password"
              value={state.password}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required={true}
              fullWidth={true}
              name="passwordConfirmation"
              label="Password confirmation"
              type="password"
              id="password"
              autoComplete="password"
              value={state.passwordConfirmation}
              onChange={handleInputChange}
            />
            <Button
              fullWidth={true}
              variant="contained"
              color="primary"
              disabled={
                !state.emailAddress ||
                !state.password ||
                !state.passwordConfirmation ||
                !(state.password === state.passwordConfirmation)
              }
              onClick={e => handleForm(e)}
            >
              Sign up
            </Button>

            {state.errors}

            <Grid container={true}>
              <Grid item={true} xs={true}></Grid>
              <Grid item={true}>
                <Link href="/login" variant="body2">
                  {'Do you already have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(Register);
