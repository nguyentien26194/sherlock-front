import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputBase,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  Paper,
  Select,
  styled,
  Switch,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import EMPTY_IMG_URL from '../../assets/images/Empty.png';
import { ALL_PRODUCTS, FIXED_AMOUNT, PERCENTAGE, SPECIFIC_PRODUCTS, UPSELL_PRODUCT } from '../../Constants';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ProductModel } from '../../reducers/ProductSlice';
import { changeView } from '../../reducers/SidebarSlice';
import ProductModal from '../product/ProductModal';
import SelectedProducts from '../product/SelectedProducts';

import Upsell from './Upsell';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '85%',
  maxHeight: '85%',
  width: '85%',
  height: '85%',
});

export default function UpsellWidgetCreate() {
  const axiosPrivate = useAxiosPrivate();
  const [cookies] = useCookies(['shopId']);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState<ProductModel[]>([]);
  const [selectedUpsellProduct, setSelectedUpsellProduct] = useState<ProductModel[]>([]);
  const [selectedTriggerProducts, setSelectedTriggerProducts] = useState<ProductModel[]>([]);
  const [activeDiscount, setActiveDiscount] = useState(false);
  const [skipUpsell, setSkipUpsell] = useState(true);
  const [discountType, setDiscountType] = useState(PERCENTAGE);
  const [discountValue, setDiscountValue] = useState('0');
  const [triggerType, setTriggerType] = useState(ALL_PRODUCTS);
  const [upsellTitle, setUpsellTitle] = useState("Hello, It's not too late to add this to your order");
  const [upsellName, setUpsellName] = useState('');
  const [multipleSelection, setMultipleSelection] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const openProductModel = (multiple: boolean) => {
    setCheckedProducts(multiple ? selectedTriggerProducts : selectedUpsellProduct);
    setMultipleSelection(multiple);
    handleOpen();
  };

  const handleSubmitProducts = () => {
    if (multipleSelection) {
      setSelectedTriggerProducts(checkedProducts);
    } else {
      setSelectedUpsellProduct(checkedProducts);
    }
    handleClose();
  };

  const handleChangeActiveDiscount = () => {
    setActiveDiscount(activeDiscount => !activeDiscount);
  };

  const handleChangeDiscountValue = (value: string) => {
    let discountValue = value;

    if (Number(value) < 0) {
      discountValue = '0';
    }
    if (discountType == PERCENTAGE && Number(value) > 100) {
      discountValue = '100';
    }
    setDiscountValue(discountValue);
  };

  const handleCreateUpsell = async () => {
    if (selectedUpsellProduct.length > 0) {
      setLoading(true);
      const response = await axiosPrivate.post(`/api/upsell-widgets/`, {
        name: upsellName === '' ? null : upsellName,
        offer_name: upsellTitle,
        offer_description: 'Exclusive offer will be expired in',
        shop: cookies.shopId,
        upsell_product_id: selectedUpsellProduct[0].cms_product_id,
        trigger_product_ids: selectedTriggerProducts.map(product => product.cms_product_id),
        discount_value: discountValue,
        discount_value_type: discountType,
        selected_all_trigger_products: triggerType === ALL_PRODUCTS,
      });

      setLoading(false);
      if (response.status === 201) {
        dispatch(changeView(<Upsell />));
      } else {
        console.log('error');
        console.log(response);
      }
    }
  };

  const calculateReviewPrice = () => {
    if (selectedUpsellProduct.length == 0) {
      return 0;
    }
    if (!activeDiscount) {
      return selectedUpsellProduct[0].price;
    }

    if (discountType == PERCENTAGE) {
      return selectedUpsellProduct[0].price * (1 - Number(discountValue) / 100);
    }

    return Math.max(selectedUpsellProduct[0].price - Number(discountValue), 0);
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
            multipleSelection={multipleSelection}
            handleSubmitProducts={handleSubmitProducts}
          />
        </Box>
      </Modal>
      <Typography variant="h6" sx={{ mt: 2, ml: 3 }}>
        Create Upsell
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
                      value={upsellName}
                      onChange={e => setUpsellName(e.target.value)}
                    />
                  </Paper>
                </Grid>

                <Grid item sx={{ mt: 2 }}>
                  <ListItemText primary="Upsell Title:" />
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
                      value={upsellTitle}
                      onChange={e => setUpsellTitle(e.target.value)}
                    />
                  </Paper>
                </Grid>

                <Grid item sx={{ marginTop: '25px' }}>
                  <Box sx={{ display: 'flex' }}>
                    <ListItemText primary="Upsell Product:" />
                    <Button size="small" variant="contained" onClick={() => openProductModel(false)}>
                      Select
                    </Button>
                  </Box>
                </Grid>
                <SelectedProducts
                  selectedProducts={selectedUpsellProduct}
                  setSelectedProducts={setSelectedUpsellProduct}
                  multipleSelection={false}
                  type={UPSELL_PRODUCT}
                />

                <Grid item sx={{ marginTop: '25px' }}>
                  <Box sx={{ display: 'flex' }}>
                    <ListItemText
                      primary={
                        triggerType == ALL_PRODUCTS
                          ? 'Trigger Products:'
                          : 'Trigger Products (' + selectedTriggerProducts.length + '):'
                      }
                    />
                    {triggerType === SPECIFIC_PRODUCTS && (
                      <Button size="small" variant="contained" onClick={() => openProductModel(true)}>
                        Select
                      </Button>
                    )}
                    <FormControl sx={{ ml: 2, minWidth: 180 }} size="small">
                      <InputLabel id="demo-select-small-label">Trigger type</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={triggerType}
                        label="Trigger type"
                        onChange={e => setTriggerType(e.target.value)}
                      >
                        <MenuItem value={ALL_PRODUCTS}>All Products</MenuItem>
                        <MenuItem value={SPECIFIC_PRODUCTS}>Specific Products</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <SelectedProducts
                  selectedProducts={selectedTriggerProducts}
                  setSelectedProducts={setSelectedTriggerProducts}
                  multipleSelection={true}
                  type={triggerType}
                />

                <Grid>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={skipUpsell}
                        onChange={() => setSkipUpsell(skipUpsell => !skipUpsell)}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label="Skip upsell if your customer just purchased the same product"
                    sx={{ marginTop: '25px' }}
                  />
                </Grid>

                <Grid item sx={{ marginTop: '15px' }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={activeDiscount}
                        onChange={handleChangeActiveDiscount}
                        name="checkedDiscount"
                        color="primary"
                      />
                    }
                    labelPlacement="start"
                    label="Setup Discount"
                    sx={{ marginLeft: 0 }}
                  />
                </Grid>

                <Grid
                  item
                  sx={{
                    marginTop: '5px',
                    marginLeft: 0,
                    marginBottom: '5px',
                    height: '30px',
                  }}
                >
                  <FormControl variant="outlined" sx={{ mr: 2, width: '35%' }} disabled={!activeDiscount} size="small">
                    <InputLabel id="demo-simple-select-outlined-label">Discount Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={discountType}
                      onChange={e => setDiscountType(e.target.value)}
                      label="Discount Type"
                    >
                      <MenuItem value={PERCENTAGE}>Percentage</MenuItem>
                      <MenuItem value={FIXED_AMOUNT}>Fixed Amount</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Value"
                    variant="outlined"
                    type="number"
                    disabled={!activeDiscount}
                    size="small"
                    value={discountValue}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{discountType == PERCENTAGE ? '%' : '€'}</InputAdornment>
                      ),
                    }}
                    onChange={e => handleChangeDiscountValue(e.target.value)}
                  />
                </Grid>

                <Grid
                  item
                  sx={{
                    marginTop: '25px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Button variant="contained" onClick={() => handleCreateUpsell()} disabled={loading}>
                    Create Upsell
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
              <Grid
                item
                sx={{
                  pt: 2,
                  bp: 2,
                  marginTop: '25px',
                  borderTop: '1px solid #d9d9d9',
                  borderBottom: '1px solid #d9d9d9',
                  backgroundColor: '#fafafa',
                  height: '90px',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <ListItemText primary={upsellTitle} sx={{ margin: 'auto', color: '#545454', fontWeight: 'bold' }} />
                <ListItemText primary="Exclusive offer will be expired in 3:00" sx={{ margin: 'auto' }} />
              </Grid>

              <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} sx={{ mt: 3 }}>
                <Grid gridColumn="span 7">
                  <Img
                    alt=""
                    src={selectedUpsellProduct.length > 0 ? selectedUpsellProduct[0].image_url : EMPTY_IMG_URL}
                  />
                  <Divider light sx={{ marginTop: '5px' }} />
                  <Grid
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      mt: 2,
                    }}
                  >
                    {selectedUpsellProduct.length > 0 &&
                      selectedUpsellProduct[0].image_urls.slice(0, 5).map((image_url: string, id: number) => {
                        return (
                          <Img
                            key={id}
                            alt=""
                            src={image_url}
                            sx={{
                              maxWidth: '20%',
                              maxHeight: '20%',
                            }}
                          />
                        );
                      })}
                  </Grid>
                </Grid>

                <Grid gridColumn="span 5">
                  <Typography variant="h6" gutterBottom>
                    {selectedUpsellProduct.length > 0 ? selectedUpsellProduct[0].title : ''}
                  </Typography>

                  <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        textDecoration: activeDiscount ? 'line-through' : '',
                      }}
                    >
                      {'€ '} {selectedUpsellProduct.length > 0 ? selectedUpsellProduct[0].price : '0'}
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ ml: 2 }}>
                      {activeDiscount && '  € ' + calculateReviewPrice()}
                    </Typography>
                  </Grid>

                  <Divider light sx={{ marginTop: '5px' }} />

                  <List>
                    <ListItem
                      sx={{
                        p: 0,
                        m: 0,
                      }}
                      style={{ display: 'flex' }}
                    >
                      <Typography variant="body2" gutterBottom sx={{ flexGrow: 1 }}>
                        Subtotal
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {'€ '}
                        {calculateReviewPrice()}
                      </Typography>
                    </ListItem>
                    <ListItem
                      sx={{
                        p: 0,
                        m: 0,
                      }}
                      style={{ display: 'flex' }}
                    >
                      <Typography variant="body2" gutterBottom sx={{ flexGrow: 1 }}>
                        Shipping
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {'Free'}
                      </Typography>
                    </ListItem>
                    <ListItem
                      sx={{
                        p: 0,
                        m: 0,
                      }}
                      style={{ display: 'flex' }}
                    >
                      <Typography variant="body2" gutterBottom sx={{ flexGrow: 1 }}>
                        Taxes
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {'Free'}
                      </Typography>
                    </ListItem>

                    <Divider light sx={{ marginTop: '5px' }} />

                    <ListItem
                      sx={{
                        p: 0,
                        marginTop: '10px',
                      }}
                      style={{ display: 'flex' }}
                    >
                      <Typography variant="h6" gutterBottom sx={{ flexGrow: 1 }}>
                        Total
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {'€ '}
                        {calculateReviewPrice()}
                      </Typography>
                    </ListItem>
                    <Grid
                      item
                      sx={{
                        marginTop: '15px',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Button variant="contained" disableElevation sx={{ marginBottom: '10px' }}>
                        Pay now . {'€ '}
                        {selectedUpsellProduct.length > 0 ? selectedUpsellProduct[0].price : '0'}
                      </Button>

                      <Button variant="outlined" disableElevation>
                        Decline this offer
                      </Button>
                    </Grid>
                  </List>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
