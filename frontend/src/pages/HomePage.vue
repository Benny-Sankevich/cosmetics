<template>
  <q-page class="q-pa-sm">
    <CardSocial />

    <q-card class="q-mt-sm" style="height: 440px">
      <q-card-section class="row">
        <div class="col-lg-7 col-sm-12 col-xs-12 col-md-7">
          <Reports />
        </div>
        <div class="col-lg-5 col-sm-12 col-xs-12 col-md-5">
          <TodayData />
        </div>
      </q-card-section>
    </q-card>

    <AppointmentsList />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  components: {
    CardSocial: defineAsyncComponent(
      () => import('../components/cards/CardSocial.vue')
    ),
    AppointmentsList: defineAsyncComponent(
      () => import('../components/appointments/AppointmentsList.vue')
    ),
    Reports: defineAsyncComponent(
      () => import('../components/dashboard/Chart.vue')
    ),
    TodayData: defineAsyncComponent(
      () => import('../components/dashboard/TodayData.vue')
    ),
  },
});
</script>
