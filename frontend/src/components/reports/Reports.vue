<template>
  <div
    class="full-width row reverse wrap justify-start items-center content-start"
  >
    <div class="col-12" style="overflow: auto">
      <div class="row">
        <div class="col-6 col-md-4">
          <q-select
            outlined
            v-model="selectedYear"
            :options="yearOptions"
            :label="$t('chooseYear')"
            style="width: 180px"
          />
        </div>
        <div class="col col-md-8 text-h5">
          {{ $t('yearReport') }}: {{ selectedYear }}
        </div>
      </div>
    </div>
    <div class="col-12" style="overflow: auto">
      <vue3-chart-js
        v-bind="{ ...barChart }"
        ref="reportsChart"
      ></vue3-chart-js>
    </div>
  </div>
</template>

<script lang="ts">
import { apiService, i18n } from '../../core/Export';
import { defineComponent, defineAsyncComponent, ref, watch } from 'vue';
import { YearReportData } from '../../models/general-models';

export default defineComponent({
  components: {
    Vue3ChartJs: defineAsyncComponent(() => import('@j-t-mcc/vue3-chartjs')),
  },
  setup() {
    const reportsChart = ref(null);
    const currentYear = ref(new Date().getFullYear());
    let yearOptions = ref([]);
    const minYear = ref(2020);

    let selectedYear = ref(currentYear);
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

    for (let i = currentYear.value; i >= minYear.value; i--) {
      yearOptions.value.push(i);
    }

    const getData = (year) => {
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
