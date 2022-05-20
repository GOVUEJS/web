import { defineStore } from 'pinia';

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    drawer: true,
  }),
  getters: {},
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});

export const useSystemStore = defineStore('system', {
  state: () => ({
    theme: 'light',
    pageTitle: '',
  }),
  actions: {
    changePageTitle(title: string) {
      this.pageTitle = title;
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    }
  },
});
