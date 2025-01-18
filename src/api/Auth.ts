import axios from './axios';

export const loginShopify = async (params: string) => {
  const result = await axios({
    url: '/api/shopify/login/' + params,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  })
    .then(function (response: { data: any }) {
      // handle success
      return response.data;
    })
    .catch(function (error: { response: { status: any } }) {
      // handle error
      return error.response.status;
    });

  return result;
};

export const confirmBilling = async (params: string) => {
  const result = await axios({
    url: '/api/shopify/confirm-billing' + params,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    responseType: 'json',
  })
    .then(function (response: { data: any }) {
      // handle success
      return response.data;
    })
    .catch(function (error: { response: { status: any } }) {
      // handle error
      return error.response.status;
    });

  return result;
};

export const signinApp = async (body: { email: string; password: string }) => {
  const result = await axios({
    url: '/api/users/auth/token/',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    responseType: 'json',
    data: body,
  })
    .then(function (response: { data: any }) {
      // handle success
      return response.data;
    })
    .catch(function (error: { response: any }) {
      // handle error
      return error.response;
    });

  return result;
};

export const refreshToken = async () => {
  const result = await axios({
    url: '/api/users/auth/token/refresh/',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    responseType: 'json',
  })
    .then(function (response: { data: { access: any } }) {
      // handle success
      return response.data.access;
    })
    .catch(function (error: { response: { status: any } }) {
      // handle error
      return error.response.status;
    });

  return result;
};

export const signupApp = async (body: any) => {
  const result = await axios({
    url: '/api/users/signup/',
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    responseType: 'json',
    data: body,
  })
    .then(function (response: any) {
      // handle success
      return response;
    })
    .catch(function (error: any) {
      // handle error
      return error;
    });

  return result;
};
