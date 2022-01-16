import { AppConstants } from '../../core/Export';
import { RouteRecordRaw } from 'vue-router';

const reportsRoutes: RouteRecordRaw = {
  path: 'reports',
  name: AppConstants.Routes.Reports,
  component: () => import('../../pages/ReportsPage.vue'),
  children: [
    {
      path: '',
      name: AppConstants.Routes.GeneralReports,
      component: () =>
        import('../../components/reports/GeneralReportsList.vue'),
    },
    {
      path: '',
      name: AppConstants.Routes.ReportGenerator,
      component: () => import('../../components/reports/ReportGenerator.vue'),
    },
    {
      path: '',
      name: AppConstants.Routes.ReportTable,
      component: () => import('../../components/reports/ReportTable.vue'),
    },
  ],
};

export { reportsRoutes };
