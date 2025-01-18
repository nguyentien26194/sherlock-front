export interface CrossSellModel {
  id: number;
  name: string;
  cms_product_ids: string[];
  shop: number;
  status: string;
  detailed_products: {
    id: number;
    cms_product_id: string;
    title: string;
    shortened_title: string;
    image_url: string;
    image_urls: string[];
  }[];
  dashboard: {
    impressions: number;
    clicks: number;
    ctr: number;
    sales: number;
    cr: number;
  };
}
