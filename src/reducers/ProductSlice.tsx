export interface ProductModel {
  id: string;
  cms_product_id: string;
  title: string;
  shortened_title: string;
  image_url: string;
  image_urls: string[];
  price: number;
  inventory_quantity: number;
}
