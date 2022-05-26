import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    email: '',
    accessToken: '',
    refreshToken: '',
  }),
  getters: {
    isLogin(): boolean {
      return !!this.accessToken && !!this.refreshToken && !!this.email;
    },
  },
  actions: {
    setEmail(email: string) {
      this.email = email;
    },
    setAccessToken(token: string) {
      this.accessToken = token;
    },
    setRefreshToken(token: string) {
      this.refreshToken = token;
    },
    logout() {
      this.accessToken = '';
      this.refreshToken = '';
      this.email = '';
    },
  },
});
