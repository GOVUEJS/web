import { echo_api } from './index';

export default {
  a001(params: { page: number }) {
    return echo_api.get('/articles', {params});
  },
  a002(data: { title: string, content: string }) {
    return echo_api.post('/articles', data);
  },
  a003(id: number) {
    return echo_api.get(`/articles/${id}`);
  },
  a004(id: number, data: { title: string, content: string }) {
    return echo_api.put(`/articles/${id}`, data);
  },
  a005(id: number) {
    return echo_api.delete(`/articles/${id}`);
  },
};