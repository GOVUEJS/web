import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useStore } from '@/store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('@/views/article/ArticleView.vue'),
  },
  {
    path: '/articles/write',
    name: 'WriteArticle',
    component: () => import('@/views/article/WriteArticleView.vue')
  },
  {
    path: '/articles/:id',
    name: 'ReadArticle',
    component: () => import('@/views/article/ReadArticleView.vue'),
    props: true
  },
  {
    path: '/spam',
    name: 'Spam',
    component: () => import('@/views/article/ArticleView.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to) => {
  useStore().changePageTitle(String(to.name));
  if (to.path === '/') {
    useStore().changePageTitle('Articles');
    return {name: 'articles'};
  }
});

export default router;
