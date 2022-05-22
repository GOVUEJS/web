import { echo_api } from './index';

export default {
  login(data: { email: string, pw: string }) {
    return echo_api.post('/login', data);
  },
  logout() {
    return echo_api.get('/logout');
  },
  signup(data: { email: string, pw: string, pwChk: string }) {
    return echo_api.post('/signup', data);
  }
};