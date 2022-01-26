<template>
  <div class="q-gutter-y-md">
    <q-tabs inline-label class="bg-light-blue-13 text-white shadow-2">
      <q-route-tab
        default
        name="reports-list"
        icon="summarize"
        :label="$t('reports')"
        :to="generalReportsRoute"
      />
      <q-route-tab
        name="report-generator"
        icon="addchart"
        :label="$t('reportGenerator')"
        :to="reportGeneratorRoute"
      />
    </q-tabs>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { AppConstants } from '../../core/Export';

export default defineComponent({
  setup() {
    return {
      generalReportsRoute: {
        name: AppConstants.Routes.GeneralReports,
      },
      reportGeneratorRoute: {
        name: AppConstants.Routes.ReportGenerator,
      },
    };
  },
});
</script>
