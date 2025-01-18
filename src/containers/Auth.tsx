import { Navigate } from 'react-router-dom';

import { confirmBilling, loginShopify } from '../api/Auth';

export default function Auth() {
  let view = <></>;
  let hmac;
  let host;
  let shop;
  let timestamp;
  let session;

  const queryParams = new URLSearchParams(window.location.search);
  const queryParamsSize = Array.from(queryParams).length;

  if (queryParamsSize === 4 || queryParamsSize === 3) {
    hmac = queryParams.get('hmac');
    host = queryParams.get('host');
    shop = queryParams.get('shop');
    timestamp = queryParams.get('timestamp');
    (async () => {
      const result = await loginShopify(`?hmac=${hmac}&host=${host}&shop=${shop}&timestamp=${timestamp}`);

      window.location.replace(result.permission_url);
    })();
  } else if (queryParamsSize === 5) {
    hmac = queryParams.get('hmac');
    host = queryParams.get('host');
    shop = queryParams.get('shop');
    timestamp = queryParams.get('timestamp');
    session = queryParams.get('session');
    (async () => {
      const result = await confirmBilling(
        `?hmac=${hmac}&host=${host}&shop=${shop}&timestamp=${timestamp}&session=${session}`,
      );

      window.location.replace(result.redirect_url);
    })();
  } else {
    // redirect to signin
    view = <Navigate replace to="/signin" />;
  }

  return <div>{view}</div>;
}
