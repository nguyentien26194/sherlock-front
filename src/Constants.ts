export const DASHBOARD_NAVIGATION = 0;

export const CROSS_SELL_NAVIGATION = 1;

export const UPSELL_NAVIGATION = 2;

export const DASHBOARD_ITEM = {
  id: DASHBOARD_NAVIGATION,
  name: 'Dashboard',
  href: '/dashboard',
};

export const CROSS_SELL_ITEM = {
  id: CROSS_SELL_NAVIGATION,
  name: 'Cross Sell',
  href: '/cross-sell',
};

export const UPSELL_ITEM = {
  id: UPSELL_NAVIGATION,
  name: 'Upsell',
  href: '/upsell',
};

export const NAVIGATIONS = [DASHBOARD_ITEM, CROSS_SELL_ITEM, UPSELL_ITEM];

export const STRONG_PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#€$%^&*()_+=[\]{}\\|;:'",.<>/?]).{8,}$/;

export const STRONG_PASSWORD_MSG =
  'The format of your password is invalid. Please use at least 1 letter, 1 number, 1 special character';

export const CONFIRM_PASSWORD_MSG = 'Please make sure your passwords match.';

export const EMAIL_NOT_FOUND_MSG = 'Email not found!';

export const WRONG_PASSWORD_MSG = 'Wrong password!';

export const UPSELL_PRODUCT = 'Upsell';

export const TRIGGER_PRODUCTS = 'Triger';

export const CROSS_SELL_PRODUCTS = 'Cross-sell';

export const PERCENTAGE = 'percentage';

export const FIXED_AMOUNT = 'fixed_amount';

export const ALL_PRODUCTS = 'all_products';

export const SPECIFIC_PRODUCTS = 'specific_products';
