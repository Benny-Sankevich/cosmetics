import { RouteRecordRaw } from 'vue-router';
import { usersRoutes } from './users/routes';
import { AppConstants, i18n } from '../core/Export';
import resolveMainData from '../resolvers/MainResolver';
import resolveDashboard from '../resolvers/dashboard/DashboardResolver';
import LoginPage from '../pages/LoginPage.vue';
import LockScreenPage from '../pages/LockScreenPage.vue';
import BlankLayout from '../layouts/BlankLayout.vue';
import MainLayout from '../layouts/MainLayout.vue';
import ProfileSettingsPage from '../pages/ProfileSettingsPage.vue';
import HomePage from '../pages/HomePage.vue';
import CustomerPage from '../pages/CustomerPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import AvailableAppointmentsPage from '../pages/AvailableAppointmentsPage.vue';
import SettingsPage from '../pages/SettingsPage.vue';
import { calendarRoutes } from './calendar/routes';
import { appStore } from '../store/index';
import { showError } from '../utils/notification-utils';
import { purchaseRoutes } from './purchase/routes';
import { reportsRoutes } from './reports/routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BlankLayout,
    children: [
      {
        path: '',
        name: AppConstants.Routes.Login,
        component: LoginPage,
      },
      {
        path: 'lock',
        name: AppConstants.Routes.LockScreen,
        component: LockScreenPage,
      },
      {
        path: 'about',
        name: AppConstants.Routes.AboutPage,
        component: AboutPage,
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
        path: 'settings',
        name: AppConstants.Routes.SettingsPage,
        component: SettingsPage,
      },
      {
        path: 'available-appointments',
        name: AppConstants.Routes.AvailableAppointmentsPage,
        component: AvailableAppointmentsPage,
      },
      calendarRoutes,
      usersRoutes,
      purchaseRoutes,
      reportsRoutes,
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
        path: '',
        name: AppConstants.Routes.ProfileSettings,
        component: ProfileSettingsPage,
      },
    ],
    meta: {
      resolve: resolveMainData,
    },
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
