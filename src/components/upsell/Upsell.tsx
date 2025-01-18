import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, CircularProgress, Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { changeView } from '../../reducers/SidebarSlice';
// import UpsellParameter from "./UpsellParameter";
import { UpsellModel } from '../../reducers/UpsellSlice';

import UpsellWidgetCreate from './UpsellWidgetCreate';
import UpsellWidgetItem from './UpsellWidgetItem';

export default function Upsell() {
  const axiosPrivate = useAxiosPrivate();
  const [cookies] = useCookies(['shopId']);
  const [loading, setLoading] = useState(true);
  const [upsellWidgets, setUpsellWidgets] = useState<UpsellModel[]>([]);
  const [upsellWidgetsCount, setUpsellWidgetsCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    getUpsellWidgets();
  }, []);

  const getUpsellWidgets = async () => {
    setUpsellWidgets([]);
    const response = await axiosPrivate.get(`/api/upsell-widgets/?shop_id=` + cookies.shopId);

    if (response?.status === 200) {
      setUpsellWidgets(response.data);
      setUpsellWidgetsCount(response.data.length);
    }
    setLoading(false);
  };

  function createNewWidget() {
    dispatch(changeView(<UpsellWidgetCreate />));
  }

  const handleDeleteWidget = async (widgetId: number) => {
    const response = await axiosPrivate.delete(`/api/upsell-widgets/${widgetId}/`);

    if (response.status == 204) {
      setUpsellWidgets(upsellWidgets.filter(widget => widget.id !== widgetId));
      setUpsellWidgetsCount(upsellWidgetsCount > 0 ? upsellWidgetsCount - 1 : 0);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: theme => (theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]),
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Grid sx={{ mb: 2 }}>
            <Button variant="contained" endIcon={<AddCircleOutlineIcon />} onClick={() => createNewWidget()}>
              New Widget
            </Button>
          </Grid>
          <Grid container rowSpacing={2} columnSpacing={4}>
            {upsellWidgets.map((upsellWidget, index) => (
              <Grid item xs={6} key={index}>
                <UpsellWidgetItem widget={upsellWidget} handleDeleteWidget={handleDeleteWidget} />
              </Grid>
            ))}
          </Grid>
          {upsellWidgetsCount > 10 && <Pagination count={upsellWidgetsCount / 10 + 1} color="primary" />}
        </Container>
      )}
    </Box>
  );
}
