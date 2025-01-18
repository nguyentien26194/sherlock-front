import * as React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

import { signinApp } from '../api/Auth';
import { EMAIL_NOT_FOUND_MSG, WRONG_PASSWORD_MSG } from '../Constants';
import { changeAccessToken } from '../reducers/UserSlice';

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

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMsg, setErrorMsg] = React.useState({
    general: '',
    email: '',
    password: '',
  });
  const [, setCookie] = useCookies(['shopId', 'shopUrl', 'name', 'logoUrl']);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signin();
  };

  const setCookies = (shopId: number, name: string, shopUrl: string, logoUrl: string) => {
    setCookie('shopId', shopId, { path: '/' });
    setCookie('name', name, { path: '/' });
    setCookie('shopUrl', shopUrl, { path: '/' });
    setCookie('logoUrl', logoUrl, { path: '/' });
  };

  const signin = async () => {
    const result = await signinApp({
      email: email,
      password: password,
    });

    const errorMsgState = {
      general: '',
      email: '',
      password: '',
    };

    if (result.access !== undefined) {
      dispatch(changeAccessToken(result.access));
      setCookies(result.shop_id, result.shop_name, result.shop_url, result.logo_url);
      navigate('/dashboard', { replace: true });
    } else if (result.status === 404) {
      if (result.data.message === EMAIL_NOT_FOUND_MSG) {
        errorMsgState.email = EMAIL_NOT_FOUND_MSG;
      } else if (result.data.message === WRONG_PASSWORD_MSG) {
        errorMsgState.password = WRONG_PASSWORD_MSG;
      }
    } else {
      errorMsgState.email = result.data.message;
    }
    setErrorMsg(errorMsgState);
  };

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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={errorMsg.email !== ''}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={errorMsg.email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            error={errorMsg.password !== ''}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={errorMsg.password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5, mb: 4 }} />
    </Container>
  );
}
