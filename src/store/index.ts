import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    theme: 'light',
    pageTitle: 'Articles',
    drawer: true,
    accessToken: '',
    refreshToken: '',
  }),
  getters: {},
  actions: {
    changePageTitle(title: string) {
      this.pageTitle = title;
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.theme = this.theme;
    },
    setTheme(theme: string) {
      this.theme = theme === 'light' ? 'light' : 'dark';
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    setAccessToken(token: string) {
      this.accessToken = token;
    },
    setRefreshToken(token: string) {
      this.refreshToken = token;
    }
  },
});
