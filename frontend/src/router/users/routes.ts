import { AppConstants } from '../../core/Export';
import { RouteRecordRaw } from 'vue-router';
import resolveUsers from '../../resolvers/users/usersResolver';

const usersRoutes: RouteRecordRaw = {
  path: 'users',
  name: AppConstants.Routes.Users,
  meta: {
    resolve: resolveUsers,
  },
  redirect: { name: AppConstants.Routes.UsersList },
  component: () => import('../../pages/UsersPage.vue'),
  children: [
    {
      path: 'list',
      name: AppConstants.Routes.UsersList,
      component: () => import('../../components/users/UsersList.vue'),
    },
  ],
};

export { usersRoutes };
