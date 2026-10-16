import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'login' },
      component: () => import('@/layouts/PortalLayout.vue'),
      children: [
        {
          path: 'new-registration/patent',
          name: 'patent-registration',
          meta: { title: 'Patent Registration' },
          component: () =>
            import('@/views/registration/PatentRegistrationView.vue'),
        },
        {
          path: 'new-registration/trademark',
          name: 'trademark-registration',
          meta: { title: 'Trademark Registration' },
          component: () =>
            import('@/views/registration/TrademarkRegistrationView.vue'),
        },
        {
          path: 'new-registration/trademark/search',
          name: 'trademark-search',
          meta: { title: 'Trademark Search' },
          component: () =>
            import('@/views/registration/TrademarkSearchView.vue'),
        },
        {
          path: 'new-registration/trademark/form',
          name: 'trademark-form',
          meta: { title: 'Trademark Registration Form' },
          component: () => import('@/views/registration/TrademarkFormView.vue'),
        },
        {
          path: 'new-registration',
          name: 'new-registration',
          meta: { title: 'New Registration' },
          component: () =>
            import('@/views/registration/NewRegistrationView.vue'),
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          meta: { title: 'Dashboard' },
          component: () => import('@/views/dashboard/DashboardV2View.vue'),
        },
      ],
    },
    {
      path: '/dashboard-old',
      name: 'dashboard-old',
      meta: { title: 'Dashboard (Old)' },
      component: () => import('@/views/dashboard/DashboardView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: { title: 'Login' },
      component: () => import('@/views/auth/LoginView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'login' } },
  ],
})

router.afterEach((to) => {
  globalThis.document.title = `${String(to.meta.title ?? 'AFFA')} | AFFA Project Tracking Portal`
})

export default router
