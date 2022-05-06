import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_SERVER}`,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});