import * as React from 'react';
import { useNavigate } from 'react-router';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { signupApp } from '../api/Auth';
import { CONFIRM_PASSWORD_MSG, STRONG_PASSWORD_MSG, STRONG_PASSWORD_REGEX } from '../Constants';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        RnT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Signup() {
  const queryParams = new URLSearchParams(window.location.search);
  const [email, setEmail] = React.useState('');
  const [shopUrl, setShopUrl] = React.useState(queryParams.get('shop_url'));
  const [emailErrorMsg, setEmailErrorMsg] = React.useState('');
  const [shopUrlErrorMsg, setShopUrlErrorMsg] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordMsg, setPasswordMsg] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (checkSignupForm(data)) {
      (async () => {
        const response = await signupApp({
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          shop_url: shopUrl,
        });

        if (response?.status === 200) {
          navigate('/signin', { replace: true });
        } else {
          const errorMsg = response?.response?.data?.message;

          if (errorMsg === 'Shop Url not found') {
            setShopUrlErrorMsg(errorMsg);
          }
        }
      })();
    }
  };

  function checkSignupForm(data: FormData) {
    if (data.get('email') === '') {
      setEmailErrorMsg('Email is not empty.');
      return false;
    }
    if (!STRONG_PASSWORD_REGEX.test(password)) {
      setPasswordMsg(STRONG_PASSWORD_MSG);
      return false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErrorMsg(CONFIRM_PASSWORD_MSG);
      return false;
    }
    setPasswordMsg('');
    setConfirmPasswordErrorMsg('');
    setEmailErrorMsg('');
    return true;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={shopUrlErrorMsg !== ''}
                required
                fullWidth
                id="shopUrl"
                label="Shop Url"
                name="shopUrl"
                autoComplete="shopUrl"
                helperText={shopUrlErrorMsg}
                defaultValue={queryParams.get('shop_url')}
                onChange={(e: { target: { value: React.SetStateAction<string | null> } }) => setShopUrl(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={emailErrorMsg !== ''}
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                helperText={emailErrorMsg}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={passwordMsg !== ''}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                helperText={passwordMsg}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={confirmPasswordErrorMsg !== ''}
                required
                fullWidth
                name="password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="new-password"
                helperText={confirmPasswordErrorMsg}
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
