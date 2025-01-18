import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { CROSS_SELL_NAVIGATION, DASHBOARD_NAVIGATION, UPSELL_NAVIGATION } from '../Constants';
import SignIn from '../containers/SignIn';

import Auth from './Auth';
import Homepage from './Homepage';
import Signup from './Signup';

import '../styles/App.css';

export default function App() {
  const mdTheme = createTheme();

  return (
    <CookiesProvider>
      <ThemeProvider theme={mdTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Homepage navigation={DASHBOARD_NAVIGATION} />} />
            <Route path="/cross-sell" element={<Homepage navigation={CROSS_SELL_NAVIGATION} />} />
            <Route path="/upsell" element={<Homepage navigation={UPSELL_NAVIGATION} />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CookiesProvider>
  );
}
