import { AppConstants } from '../../core/Export';
import { RouteRecordRaw } from 'vue-router';
import resolveUsers from '../../resolvers/users/usersResolver';

const usersRoutes: RouteRecordRaw = {
  path: 'users',
  name: AppConstants.Routes.Users,
  meta: {
    resolve: resolveUsers,
  },
  component: () => import('../../pages/UsersPage.vue'),
  children: [
    {
      path: '',
      name: AppConstants.Routes.UsersList,
      component: () => import('../../components/users/UsersList.vue'),
    },
  ],
};

export { usersRoutes };
