import axios from 'axios';

export const echo_api = axios.create({
    baseURL: `/api`,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'},
});