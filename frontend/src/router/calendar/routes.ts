import { AppConstants } from '../../core/Export';
import { RouteRecordRaw } from 'vue-router';
import resolveCalendar from '../../resolvers/calendar/CalendarResolver';

const calendarRoutes: RouteRecordRaw = {
  path: 'calendar',
  name: AppConstants.Routes.Calendar,
  redirect: { name: AppConstants.Routes.Calendar },
  component: () => import('../../pages/CalendarPage.vue'),
  meta: {
    resolve: resolveCalendar,
  },
  children: [
    {
      path: '',
      props: true,
      name: AppConstants.Routes.Calendar,
      component: () => import('../../components/calendar/Calendar.vue'),
    },
  ],
};

export {
    calendarRoutes,
};
