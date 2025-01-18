import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Chart from './Chart';
import DataItem from './DataItem';

import 'react-datepicker/dist/react-datepicker.css';

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

export default function Dashboard() {
  const data = [55, 51, 63, 45, 67, 51, 71];
  const labels = ['2023-05-08', '2023-05-09', '2023-05-10', '2023-05-11', '2023-05-12', '2023-05-13', '2023-05-14'];
  const [startDate] = useState(new Date());
  const [endDate] = useState(new Date());

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
        flexGrow: 1,
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 14 }}>
        <Grid container spacing={4}>
          <Grid item xs={2}>
            <DataItem name={'Impressions'} value={12} />
          </Grid>
          <Grid item xs={2}>
            <DataItem name={'Clicks'} value={12} />
          </Grid>
          <Grid item xs={2}>
            <DataItem name={'CTR'} value={12} />
          </Grid>
          <Grid item xs={2}>
            <DataItem name={'Sales'} value={12} />
          </Grid>
          <Grid item xs={2}>
            <DatePicker
              selected={startDate}
              onChange={() => console.log(123)}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              dateFormat="d MMM yyyy"
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Chart data={data} labels={labels} style={{ height: '200px' }} />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
