import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useStore } from '@/store';
import { useUserStore } from '@/store/user';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUpView.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/articles',
    name: 'Articles',
    component: () => import('@/views/article/ArticleView.vue'),
  },
  {
    path: '/articles/write',
    name: 'WriteArticle',
    component: () => import('@/views/article/WriteArticleView.vue'),
    meta: {requiresAuth: true},
  },
  {
    path: '/articles/:id',
    name: 'ReadArticle',
    component: () => import('@/views/article/ReadArticleView.vue'),
    props: true,
  },
  {
    path: '/spam',
    name: 'Spam',
    component: () => import('@/views/article/ArticleView.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to) => {
  const store = useStore();
  const userStore = useUserStore();
  store.changePageTitle(String(to.name));

  if (to.meta.requiresAuth && !userStore.isLogin) {
    return {
      path: '/login',
    };
  }

  if (to.path === '/') {
    store.changePageTitle('Articles');
    return {name: 'Articles'};
  }
});

export default router;
