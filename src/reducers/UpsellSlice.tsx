export interface UpsellModel {
  id: number;
  name: string;
  cms_product_id: string;
  detailed_product: {
    title: string;
    image_url: string;
    image_urls: string[];
  };
  shop: number;
  status: string;
  dashboard: {
    impressions: number;
    clicks: number;
    ctr: number;
    sales: number;
    cr: number;
  };
}

// const initialState: PostPurchaseState = {
//   processing: false,
//   currentWidgetType: 0,
//   categoryList: ['Beauty', 'Lifestyle', 'Decoration'],
//   products: [],
//   allProductSearchText: '',
//   allProducts: [],
//   selectedProducts: [],
//   emailSetting: {
//     shop: undefined,
//     id: undefined,
//     emailProvider: '',
//     privateApiKey: '',
//     publicApiKey: '',
//   },
// };

// export const UpsellSlice = createSlice({
//   name: 'Upsell',
//   initialState,
//   reducers: {
//   },
// });

// // Action creators are generated for each case reducer function
// export const {
// } = UpsellSlice.actions;

// export default UpsellSlice.reducer;
