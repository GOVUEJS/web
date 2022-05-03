import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/home', component: () => import('@/views/HomeView')},
        {path: '/about', component: () => import('@/views/AboutView')},
    ],
});

export default router;