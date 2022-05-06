import { echo_api } from '@/api/index';

export default {
    a001() {
        return echo_api.get('articles')
            .then(e => {
                console.log(e);
            }).catch(e => {
                console.log(e);
            });
    },
};