import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import { createPinia } from 'pinia';
import { useCookies } from 'vue3-cookies';
import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';


loadFonts();

export const app = createApp(App);

const {cookies} = useCookies();
app.config.globalProperties.$cookies = cookies;

const toast = useToast();
app.config.globalProperties.$toast = toast;

app.use(createPinia())
  .use(router)
  .use(vuetify)
  .use(Toast, {
    position: "bottom-right",
  })
  .mount('#app');
