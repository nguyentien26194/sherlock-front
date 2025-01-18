import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { ProductModel } from '../../reducers/ProductSlice';

interface Column {
  id: 'image' | 'title' | 'price' | 'stock';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const columns: readonly Column[] = [
  { id: 'image', label: '', minWidth: 20 },
  { id: 'title', label: 'Title', minWidth: 250 },
  { id: 'price', label: 'Price (€)', minWidth: 30, align: 'right' },
  { id: 'stock', label: 'Stock', minWidth: 30, align: 'right' },
];

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface Props {
  checkedProducts: ProductModel[];
  setCheckedProducts: (newCheckedProducts: ProductModel[]) => void;
  multipleSelection: boolean;
  handleSubmitProducts: () => void;
}

export default function ProductModal({
  checkedProducts,
  setCheckedProducts,
  multipleSelection,
  handleSubmitProducts,
}: Props) {
  const axiosPrivate = useAxiosPrivate();
  const [cookies] = useCookies(['shopId']);
  const [loading, setLoading] = useState(true);
  const [searchTitle, setSearchTitle] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [productLength, setProductLength] = useState(0);

  useEffect(() => {
    getProducts();
  }, [searchTitle, page]);

  const getProducts = async () => {
    setLoading(true);
    const offset = page * rowsPerPage - rowsPerPage;
    const response = await axiosPrivate.get(
      `/api/products/?shop_id=${cookies.shopId}&offset=${offset}&limit=${rowsPerPage}&search=${searchTitle}`,
    );

    if (response.status === 200) {
      setProducts(response.data.results);
      setProductLength(response.data.count);
    }
    setLoading(false);
  };

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchOnchange = (title: string) => {
    setSearchTitle(title);
    setPage(1);
  };

  const handleCheckProduct = (event: React.ChangeEvent<HTMLInputElement>, cms_product_id: string) => {
    const checkedProduct = products.find((product: ProductModel) => product.cms_product_id == cms_product_id);

    if (checkedProduct) {
      let newCheckedProducts;

      if (event.target.checked) {
        newCheckedProducts = multipleSelection ? [...checkedProducts, checkedProduct] : [checkedProduct];
      } else {
        newCheckedProducts = checkedProducts.filter(
          (product: ProductModel) => product.cms_product_id != cms_product_id,
        );
      }
      setCheckedProducts(newCheckedProducts);
    }
  };

  const isSelected = (cms_product_id: string) =>
    checkedProducts.map((product: ProductModel) => product.cms_product_id).indexOf(cms_product_id) !== -1;

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Products
      </Typography>
      <Paper sx={{ mt: 2, mb: 2 }}>
        <IconButton type="button" aria-label="search google maps'">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'Search' }}
          onChange={event => handleSearchOnchange(event.target.value)}
        />
      </Paper>
      {loading ? (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ minWidth: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product: ProductModel) => {
                const isItemSelected = isSelected(product.cms_product_id);

                return (
                  <TableRow key={product.id} hover sx={{ cursor: 'pointer' }} selected={isItemSelected}>
                    <TableCell style={{ width: 50, padding: 5 }}>
                      <Img alt="complex" src={product.image_url} />
                    </TableCell>
                    <TableCell scope="row">{product.shortened_title}</TableCell>
                    <TableCell style={{ width: 110 }} align="right">
                      {product.price}
                    </TableCell>
                    <TableCell style={{ width: 90 }} align="right">
                      {product.inventory_quantity}
                    </TableCell>
                    <TableCell
                      style={{
                        width: 5,
                        paddingTop: 5,
                        paddingRight: 0,
                        paddingBottom: 0,
                      }}
                    >
                      <Checkbox
                        key={product.id}
                        checked={isItemSelected}
                        onChange={event => handleCheckProduct(event, product.cms_product_id)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <Box sx={{ display: 'flex' }}>
                    <Pagination
                      size="small"
                      count={(productLength % rowsPerPage) + 1}
                      page={page}
                      onChange={handleChange}
                    />
                    <Button size="small" sx={{ flexGrow: 1 }}>
                      Cancel
                    </Button>
                    <Button variant="contained" size="small" sx={{ ml: 2 }} onClick={() => handleSubmitProducts()}>
                      Select
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
