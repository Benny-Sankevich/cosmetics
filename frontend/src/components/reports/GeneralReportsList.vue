<template>
  <div class="col-10" style="max-width: 1350px">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>{{ $t('reports') }}</q-toolbar-title>
    </q-toolbar>

    <q-list bordered separator>
      <q-item v-for="report in reportsList" :key="report._id" class="q-my-sm" v-ripple>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ report.letter }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ $t(report.title) }}</q-item-label>
          <q-item-label caption lines="1">{{
            $t(report.description)
          }}</q-item-label>
        </q-item-section>
        <q-select v-if="report.isMonthly" class="col-2 q-pr-lg" outlined v-model="selectedMonth" :options="monthOptions" :label="$t('chooseMonth')" style="overflow: auto" />
        <q-select v-if="report.isYearly" class="col-3" outlined v-model="selectedYear" :options="yearOptions" :label="$t('chooseYear')" style="overflow: auto" />

        <q-item-section side>
          <q-btn @click="showReport(report)" flat round dense icon="summarize" color="green">
            <q-tooltip>{{ $t('showReport') }}</q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { apiService, AppConstants, functionsService } from '../../core/Export';
import { useRouter } from 'vue-router';
import { useStore } from '../../store';
import { ReportPropertiesToView } from '../../store/reports/models';

export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const reportsList = ref(null);
    const currentYear = ref(functionsService.getCurrentYear());
    const currentMonth = ref(functionsService.getCurrentMonth());
    const yearOptions = ref(functionsService.getYearsList());
    const monthOptions = ref(functionsService.getMonthsList());
    const selectedYear = ref(currentYear);
    const selectedMonth = ref(currentMonth);

    apiService.getReportsList().then((res) => {
      reportsList.value = res;
    });
    const showReport = (reportParameters: ReportPropertiesToView): void => {
      reportParameters.year = selectedYear.value;
      reportParameters.month = selectedMonth.value;
      apiService.getReportsData(reportParameters).then((res) => {
        res.year = selectedYear.value;
        res.month = selectedMonth.value;
        store.commit(
          `${AppConstants.ReportModule}/${AppConstants.Report.MutationSetReportProperties}`,
          res
        );
        router.push({
          name: AppConstants.Routes.ReportTable,
        });
      });
    };
    return {
      reportsList,
      yearOptions,
      monthOptions,
      selectedYear,
      selectedMonth,
      showReport,
    };
  },
});
</script>
