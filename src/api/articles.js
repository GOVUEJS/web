import { echo_api } from '@/api/index';

export default {
    a001() {
        return echo_api.get('/articles');
    },
    a002(data) {
        return echo_api.post('/articles', data);
    },
    a003(id) {
        return echo_api.get(`/articles/${id}`);
    },
    a004(id, data) {
        return echo_api.put(`/articles/${id}`, data);
    },
    a005(id) {
        return echo_api.delete(`/articles/${id}`);
    },
};