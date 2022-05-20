import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    theme: 'light',
    pageTitle: 'Articles',
    drawer: true,

  }),
  getters: {},
  actions: {
    changePageTitle(title: string) {
      this.pageTitle = title;
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    },
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
