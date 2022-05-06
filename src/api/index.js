import axios from 'axios';

export const echo_api = axios.create({
    // baseURL: `${process.env.VUE_APP_API_SERVER}`,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});