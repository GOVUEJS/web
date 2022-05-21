import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

function setInterceptor(instance: AxiosInstance) {
  // 요청 인터셉터 추가하기
  axios.interceptors.request.use(function (config: AxiosRequestConfig) {
    // 요청이 전달되기 전에 작업 수행

    return config;
  }, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  });

// 응답 인터셉터 추가하기
  axios.interceptors.response.use(function (response: AxiosResponse) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  }, function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  });

  return instance;
}

export const echo_api = function () {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_SERVER}/api/v1`,
  });

  return setInterceptor(instance);
}();