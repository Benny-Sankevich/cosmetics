<template>
  <div
    class="full-width row reverse wrap justify-start items-center content-start"
  >
    <div class="row col-12 q-col-gutter-md">
      <q-select
        class="col-md-3 col-sm-12 col-xs-12"
        outlined
        v-model="selectedYear"
        :options="yearOptions"
        :label="$t('chooseYear')"
        style="overflow: auto"
      />
      <span class="text-h5 col-md-4 col-sm-12 col-xs-12">
        {{ $t('yearReport') }}: {{ selectedYear }}</span
      >
    </div>
    <div class="col-12">
      <vue3-chart-js
        style="overflow: auto; min-height: 175px; max-height: 340px; min-width: 330px max-width: 350px; "
        v-bind="{ ...barChart }"
        ref="reportsChart"
      ></vue3-chart-js>
    </div>
  </div>
</template>

<script lang="ts">
import { apiService, functionsService, i18n } from '../../core/Export';
import { defineComponent, defineAsyncComponent, ref, watch } from 'vue';
import { YearReportData } from '../../models/general-models';

export default defineComponent({
  components: {
    Vue3ChartJs: defineAsyncComponent(() => import('@j-t-mcc/vue3-chartjs')),
  },
  setup() {
    const reportsChart = ref(null);
    const currentYear = ref(functionsService.getCurrentYear());
    const yearOptions = ref(functionsService.getYearsList());
    const selectedYear = ref(currentYear);

    let barChart = ref({
      options: {
        min: 0,
        max: 100,
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      data: {
        labels: [
          i18n.global.t('january'),
          i18n.global.t('february'),
          i18n.global.t('march'),
          i18n.global.t('april'),
          i18n.global.t('may'),
          i18n.global.t('june'),
          i18n.global.t('july'),
          i18n.global.t('august'),
          i18n.global.t('september'),
          i18n.global.t('october'),
          i18n.global.t('november'),
          i18n.global.t('december'),
        ],
        datasets: [],
      },
    });

    const getData = (year): void => {
      apiService.getReportDataByYear(year).then((res) => {
        barChart.value.data.datasets = res as YearReportData[];
        reportsChart.value.update();
      });
    };
    getData(currentYear.value);

    watch(selectedYear, (year) => {
      getData(year);
    });

    return {
      barChart,
      reportsChart,
      yearOptions,
      selectedYear,
    };
  },
});
</script>
