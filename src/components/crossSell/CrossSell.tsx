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
import { CrossSellModel } from '../../reducers/CrossSellSlice';
import { changeView } from '../../reducers/SidebarSlice';

import CrossSellWidgetCreate from './CrossSellWidgetCreate';
import CrossSellWidgetItem from './CrossSellWidgetItem';

export default function CrossSell() {
  const [loading, setLoading] = useState(true);
  const [crossSellWidgets, setCrossSellWidgets] = useState<CrossSellModel[]>([]);
  const dispatch = useDispatch();
  const [widgetsCount, setWidgetsCount] = useState(0);
  const [cookies] = useCookies(['shopId']);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    getCrossSellWidgets();
  }, []);

  const getCrossSellWidgets = async () => {
    setCrossSellWidgets([]);
    const response = await axiosPrivate.get(`/api/cross-sell-widgets/?shop_id=` + cookies.shopId);

    if (response?.status === 200) {
      setCrossSellWidgets(response.data);
      setWidgetsCount(response.data.length);
    }
    setLoading(false);
  };

  function createNewWidget() {
    dispatch(changeView(<CrossSellWidgetCreate />));
  }

  const handleDeleteWidget = async (widgetId: number) => {
    const response = await axiosPrivate.delete(`/api/cross-sell-widgets/${widgetId}/`);

    if (response.status == 204) {
      setCrossSellWidgets(crossSellWidgets.filter(widget => widget.id !== widgetId));
      setWidgetsCount(widgetsCount > 0 ? widgetsCount - 1 : 0);
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
            {crossSellWidgets.map((crossSellWidget, index) => (
              <Grid item xs={6} key={index}>
                <CrossSellWidgetItem widget={crossSellWidget} handleDeleteWidget={handleDeleteWidget} />
              </Grid>
            ))}
          </Grid>
          {widgetsCount > 10 && <Pagination count={widgetsCount / 10 + 1} color="primary" />}
        </Container>
      )}
    </Box>
  );
}
