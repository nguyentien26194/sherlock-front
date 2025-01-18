import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AxiosError, AxiosResponse } from 'axios';

import { refreshToken } from '../api/Auth';
import { axiosPrivate } from '../api/axios';
import { changeAccessToken } from '../reducers/UserSlice';
import { RootState } from '../store';

const useAxiosPrivate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error),
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401) {
          try {
            const newAccessToken = await refreshToken();

            if (newAccessToken !== undefined && newAccessToken !== 401 && prevRequest !== undefined) {
              dispatch(changeAccessToken(newAccessToken));
              prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              return axiosPrivate(prevRequest);
            } else {
              navigate('/signin', { replace: true });
            }
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
        return error.response;
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken]);
  return axiosPrivate;
};

export default useAxiosPrivate;
