import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  LinearProgress,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { ALL_PRODUCTS, SPECIFIC_PRODUCTS } from '../../Constants';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ProductModel } from '../../reducers/ProductSlice';
import { changeView } from '../../reducers/SidebarSlice';
import ProductModal from '../product/ProductModal';
import SelectedProducts from '../product/SelectedProducts';

import CrossSell from './CrossSell';

export default function CrossSellWidgetCreate() {
  const axiosPrivate = useAxiosPrivate();
  const [cookies] = useCookies(['shopId']);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState<ProductModel[]>([]);
  const [selectedCrossSellProducts, setSelectedCrossSellProducts] = useState<ProductModel[]>([]);
  const [crossSellName, setCrossSellName] = useState('');
  const [triggerType, setTriggerType] = useState(ALL_PRODUCTS);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openProductModel = () => {
    setCheckedProducts(selectedCrossSellProducts);
    handleOpen();
  };

  const handleSubmitProducts = () => {
    setSelectedCrossSellProducts(checkedProducts);
    handleClose();
  };

  const handleCreateCrossSellWidget = async () => {
    setLoading(true);
    const response = await axiosPrivate.post(`/api/cross-sell-widgets/`, {
      name: crossSellName === '' ? null : crossSellName,
      shop: cookies.shopId,
      product_ids: selectedCrossSellProducts.map(product => product.cms_product_id),
      selected_all_products: triggerType === ALL_PRODUCTS,
    });

    setLoading(false);
    if (response.status === 201) {
      dispatch(changeView(<CrossSell />));
    } else {
      console.log('error');
      console.log(response);
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <ProductModal
            checkedProducts={checkedProducts}
            setCheckedProducts={setCheckedProducts}
            multipleSelection={true}
            handleSubmitProducts={handleSubmitProducts}
          />
        </Box>
      </Modal>
      <Typography variant="h6" sx={{ mt: 2, ml: 3 }}>
        Create Cross-sell Widget
      </Typography>
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={5}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Grid container direction="column">
                <Grid container direction="row" justifyContent="flex-start" alignItems="center" sx={{ mb: 1 }}>
                  <Typography>Name: </Typography>
                  <Tooltip title={"Your own reference, the customer won't see it."} placement="top">
                    <LiveHelpOutlinedIcon fontSize="small" />
                  </Tooltip>
                </Grid>

                <Grid item>
                  <Paper
                    component="form"
                    sx={{
                      p: '6px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      value={crossSellName}
                      onChange={e => setCrossSellName(e.target.value)}
                    />
                  </Paper>
                </Grid>

                <Grid item sx={{ marginTop: '25px' }}>
                  <Box sx={{ display: 'flex' }}>
                    <ListItemText
                      primary={
                        triggerType == ALL_PRODUCTS
                          ? 'Cross-sell Products:'
                          : 'Cross-sell Products (' + selectedCrossSellProducts.length + '):'
                      }
                    />
                    {triggerType === SPECIFIC_PRODUCTS && (
                      <Button size="small" variant="contained" onClick={() => openProductModel()}>
                        Select
                      </Button>
                    )}
                    <FormControl sx={{ ml: 2, minWidth: 180 }} size="small">
                      <InputLabel id="demo-select-small-label">Select type</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={triggerType}
                        label="Select type"
                        onChange={e => setTriggerType(e.target.value)}
                      >
                        <MenuItem value={ALL_PRODUCTS}>All Products</MenuItem>
                        <MenuItem value={SPECIFIC_PRODUCTS}>Specific Products</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <SelectedProducts
                  selectedProducts={selectedCrossSellProducts}
                  setSelectedProducts={setSelectedCrossSellProducts}
                  multipleSelection={true}
                  type={triggerType}
                />

                <Grid
                  item
                  sx={{
                    marginTop: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Button variant="contained" onClick={() => handleCreateCrossSellWidget()} disabled={loading}>
                    Create Cross-sell
                  </Button>
                  {loading && (
                    <Box sx={{ width: '100%', marginTop: '2px' }}>
                      <LinearProgress />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8} lg={7}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Box sx={{ mt: 3 }}>
                <Grid>
                  <Typography sx={{ fontWeight: 'bold', fontSize: 18 }}>
                    &#123;Customer nom&#125;, avant de nous quitter ...
                  </Typography>
                  <Typography>On aimerait vous faire découvrir nos produits</Typography>
                  <Divider light />
                  <Grid
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      mt: 2,
                    }}
                  >
                    {selectedCrossSellProducts.length > 0 &&
                      selectedCrossSellProducts.slice(0, 5).map(product => {
                        return (
                          <Card sx={{ maxWidth: 150, m: 1 }} key={product.id}>
                            <CardMedia
                              sx={{ height: 150, maxWidth: 150 }}
                              image={product.image_url}
                              title={product.title}
                            />
                            <CardContent>
                              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} noWrap>
                                {product.shortened_title}
                              </Typography>
                              <Typography variant="subtitle2">€{product.price}</Typography>
                              <Typography variant="subtitle2">Voir &#62;</Typography>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
