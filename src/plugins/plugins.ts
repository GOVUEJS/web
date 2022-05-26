import { useCookies } from 'vue3-cookies';
import { useToast } from 'vue-toastification';

const {cookies: plugins} = useCookies();
const toast = useToast();

declare module 'vue' {
  interface ComponentCustomProperties {
    $cookies: typeof plugins;
    $toast: typeof toast;
  }
}
