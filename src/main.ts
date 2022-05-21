import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';
import { useCookies } from 'vue3-cookies';

loadFonts();

export const app = createApp(App);

const {cookies} = useCookies();
app.config.globalProperties.$cookies = cookies;

app.use(createPinia())
  .use(router)
  .use(vuetify)
  .mount('#app');
