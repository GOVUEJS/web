import { echo_api } from './index';
import { useUserStore } from '@/store/user';
import axios from 'axios';

export default {
  login(data: { email: string, pw: string }) {
    return echo_api.post('/login', data);
  },
  logout() {
    return echo_api.get('/logout');
  },
  signup(data: { email: string, pw: string, pwChk: string }) {
    return echo_api.post('/signup', data);
  },
  refreshToken() {
    return axios.post(`${process.env.VUE_APP_API_SERVER}/api/v1/token/refresh`, {
      accessToken: useUserStore().accessToken,
      refreshToken: useUserStore().refreshToken,
    });
  },
};