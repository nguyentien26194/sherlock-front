import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { ALL_PRODUCTS } from '../../Constants';
import { ProductModel } from '../../reducers/ProductSlice';

interface Props {
  selectedProducts: ProductModel[];
  setSelectedProducts: (newSelectedProducts: ProductModel[]) => void;
  multipleSelection: boolean;
  type: string;
}

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '9%',
  maxHeight: '9%',
});

export default function SelectedProducts({ selectedProducts, setSelectedProducts, multipleSelection, type }: Props) {
  const removeProduct = (cms_product_id: string) => {
    const newSelectedProducts = selectedProducts.filter(
      (product: ProductModel) => product.cms_product_id !== cms_product_id,
    );

    if (newSelectedProducts) {
      setSelectedProducts(newSelectedProducts);
    }
  };

  return (
    <Paper
      sx={{
        width: '100%',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        mt: 1,
        p: 1,
        maxHeight: '225px',
        overflow: 'auto',
        height: !multipleSelection ? '85px' : '255px',
      }}
    >
      {multipleSelection && type == ALL_PRODUCTS ? (
        <Typography variant="body1" gutterBottom sx={{ marginTop: '8px' }}>
          All products are selected!
        </Typography>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {selectedProducts.length > 0 ? (
            selectedProducts.map((product: ProductModel, id: number) => {
              return (
                <ListItem
                  key={id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => removeProduct(product.cms_product_id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    p: 0,
                    m: 0,
                    ':hover': {
                      backgroundColor: '#c5d9ec',
                    },
                  }}
                >
                  <Img alt="complex" src={product.image_url} />
                  <ListItemText primary={product.title} secondary={product.price + ' €'} />
                </ListItem>
              );
            })
          ) : (
            <ListItem sx={{ p: 0, m: 0 }}>
              <ListItemText primary="Empty" sx={{ marginLeft: 'auto' }} />
            </ListItem>
          )}
        </List>
      )}
    </Paper>
  );
}
