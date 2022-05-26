import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    theme: 'light',
    pageTitle: 'Articles',
    drawer: true,
    ip: '',
  }),
  getters: {
  },
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
    setIp(ip: string) {
      this.ip = ip;
    },
  },
});
