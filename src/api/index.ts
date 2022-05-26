import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useStore } from '@/store';
import { useUserStore } from '@/store/user';
import { useToast } from 'vue-toastification';
import system from '@/api/system';

const toast = useToast();

function setInterceptor(instance: AxiosInstance) {
  // 요청 인터셉터 추가하기
  instance.interceptors.request.use(function (config: AxiosRequestConfig) {
    // 요청이 전달되기 전에 작업 수행
    if (config.headers === undefined) {
      config.headers = {};
    }
    config.headers['X-Forwarded-For'] = useStore().ip;
    if (useUserStore().accessToken !== '') {
      config.headers.Authorization = `Bearer ${useUserStore().accessToken}`;
    }
    return config;
  }, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  });

// 응답 인터셉터 추가하기
  instance.interceptors.response.use(function (response: AxiosResponse) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  }, async function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    if (error.response.status === 401) {
      if (error.config.retry === undefined) {
        const res = await system.refreshToken();
        if (res.status !== 200) {
          return Promise.reject(error);
        }

        useUserStore().setAccessToken(res.data.accessToken);
        useUserStore().setRefreshToken(res.data.refreshToken);
        error.config.headers.Authorization = `Bearer ${useUserStore().accessToken}`
        return axios(error.config);
      } else {
        toast.error('권한이 없습니다.');
      }
    } else if (error.response.status === 403) toast.error('권한이 없습니다.');
    else toast.error('오류가 발생했습니다.');

    return Promise.reject(error);
  });

  return instance;
}

export const echo_api = function () {
  const axiosInstance = axios.create({
    baseURL: `${process.env.VUE_APP_API_SERVER}/api/v1`,
    withCredentials: true,
  });
  return setInterceptor(axiosInstance);
}();