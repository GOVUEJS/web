import { useCookies } from 'vue3-cookies';

const {cookies} = useCookies();
declare module 'vue' {
  interface ComponentCustomProperties {
    $cookies: typeof cookies;
  }
}
