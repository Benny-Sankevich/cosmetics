<template>
  <q-card class="bg-transparent no-shadow no-border">
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="col-md-3 col-sm-12 col-xs-12"
        >
          <q-item :style="`background-color: ${item.color1}`" class="q-pa-none">
            <q-item-section class="q-pa-md q-ml-none text-white">
              <q-item-label class="text-white text-h6 text-weight-bolder">{{
                item.value
              }}</q-item-label>
              <q-item-label>{{ item.title }}</q-item-label>
            </q-item-section>
            <q-item-section side class="q-mr-md text-white">
              <q-icon :name="item.icon" color="white" size="44px"></q-icon>
            </q-item-section>
          </q-item>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { apiService, i18n } from '../../core/Export';

export default defineComponent({
  setup() {
    const activeUsers = ref(0);
    const monthlyIncome = ref(0);
    const monthlyExpenditure = ref(0);
    const newUsersToday = ref(0);
    const today = new Date();
    const dateRange = ref({
      fromTime: `${today.getFullYear()}-${today.getMonth() + 1}-01`,
      toTime: `${today.getFullYear()}-${today.getMonth() + 1}-31`,
    });
    apiService.getTotalUsers().then((res) => (activeUsers.value = res));
    apiService
      .getSumOfOrdersBetweenDate(dateRange.value)
      .then((res) => (monthlyIncome.value = res));
    apiService
      .getTodayNewUsersAsync()
      .then((res) => (newUsersToday.value = res));
    apiService
      .getSumOfPurchaseOrdersBetweenDate(dateRange.value)
      .then((res) => (monthlyExpenditure.value = res));
    const items = computed(() => {
      return [
        {
          title: i18n.global.t('monthlyIncome'),
          icon: 'fas fa-dollar-sign',
          value: `₪ ${monthlyIncome.value}`,
          color1: '#546bfa',
          color2: '#3e51b5',
        },
        {
          title: i18n.global.t('monthlyExpenditure'),
          icon: 'fas fa-chart-bar',
          value: `₪ ${monthlyExpenditure.value}`,
          color1: '#3a9688',
          color2: '#3e51b5',
        },
        {
          title: i18n.global.t('newCustomersToday'),
          icon: 'fas fa-chart-line',
          value: newUsersToday.value,
          color1: '#7cb342',
          color2: '#3e51b5',
        },
        {
          title: i18n.global.t('activeUsers'),
          icon: 'person',
          value: activeUsers.value,
          color1: '#f88c2b',
          color2: '#3e51b5',
        },
      ];
    });
    return {
      items,
    };
  },
});
</script>
