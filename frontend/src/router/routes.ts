import { RouteRecordRaw } from 'vue-router';
import { usersRoutes } from './users/routes';
import { AppConstants, i18n } from '../core/Export';
import resolveMainData from '../resolvers/MainResolver';
import resolveDashboard from '../resolvers/dashboard/DashboardResolver';
import LoginPage from 'pages/LoginPage.vue';
import BlankLayout from 'layouts/BlankLayout.vue';
import MainLayout from 'layouts/MainLayout.vue';
import ProfileSettingsPage from '../pages/ProfileSettingsPage.vue';
import HomePage from '../pages/HomePage.vue';
import CustomerPage from '../pages/CustomerPage.vue';
import { calendarRoutes } from './calendar/routes';
import { appStore } from '../store/index';
import { showError } from 'src/utils/notification-utils';
import { purchaseRoutes } from './purchase/routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BlankLayout,
    children: [
      {
        path: '/',
        name: AppConstants.Routes.Login,
        component: LoginPage,
      },
    ],
    meta: {
      resolve: resolveMainData,
    },
  },
  {
    beforeEnter: (to, from, next) => {
      const user =
        appStore.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ];
      if (!user) {
        showError(i18n.global.t('msgYouAreNotLoggedIn'));
        return next('/');
      }
      if (user && user.isAdmin && user.isAdmin === process.env.adminKey) {
        return next();
      } else {
        showError(i18n.global.t('msgYouDontAuthorizedToAccessThatPage'));
        return next('/customer');
      }
    },
    path: '/manager',
    component: MainLayout,
    children: [
      { path: '', name: AppConstants.Routes.HomePage, component: HomePage },
      {
        path: 'reports',
        component: () => import('../components/reports/Reports.vue'),
      },
      {
        path: 'settings',
        component: () => import('../pages/SettingsPage.vue'),
      },
      calendarRoutes,
      usersRoutes,
      purchaseRoutes,
    ],
    meta: {
      resolve: resolveDashboard,
    },
  },
  {
    beforeEnter: (to, from, next) => {
      const user =
        appStore.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ];
      if (!user) {
        showError(i18n.global.t('msgYouAreNotLoggedIn'));
        return next('/');
      }
      if (user && user.isAdmin && user.isAdmin === process.env.adminKey) {
        showError(i18n.global.t('msgYouDontAuthorizedToAccessThatPage'));
        return next('/manager');
      } else {
        return next();
      }
    },
    path: '/customer',
    component: MainLayout,
    children: [
      {
        path: '',
        name: AppConstants.Routes.CustomerPage,
        component: CustomerPage,
      },
    ],
    meta: {
      resolve: resolveMainData,
    },
  },
  {
    beforeEnter: (to, from, next) => {
      const user =
        appStore.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ];
      if (!user) {
        showError(i18n.global.t('msgYouAreNotLoggedIn'));
        return next('/');
      } else {
        return next();
      }
    },
    path: '/profile',
    component: MainLayout,
    children: [
      {
        path: 'profile',
        name: AppConstants.Routes.ProfileSettings,
        component: ProfileSettingsPage,
      },
    ],
    meta: {
      resolve: resolveMainData,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
