<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="fit">
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab
          name="appointments"
          :class="tab == 'contact' ? 'text-blue' : ''"
          icon="contacts"
          :label="$t('yourTreatments')"
        >
          <q-badge color="red" floating>{{ appointmentsCount }}</q-badge></q-tab
        >
        <q-tab
          name="availableAppointment"
          :class="tab == 'message' ? 'text-blue' : ''"
          icon="comment"
          :label="$t('availableAppointments')"
        >
          <q-badge color="red" floating>{{
            availableAppointmentsCount
          }}</q-badge>
        </q-tab>
        <q-tab
          name="notification"
          :class="tab == 'notification' ? 'text-blue' : ''"
          icon="notifications"
          label="Notification"
        >
          <q-badge color="red" floating>{{ notificationsCount }}</q-badge>
        </q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="appointments" class="q-pa-sm">
          <CustomerAppointments @countChanged="setCount" />
        </q-tab-panel>
        <q-tab-panel name="availableAppointment" class="q-pa-sm">
          <CustomerAvailableAppointments @countChanged="setCount" />
        </q-tab-panel>

        <q-tab-panel name="notification" class="q-pa-sm">
          <CustomerNotifications @countChanged="setCount" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { AppConstants } from '../../../core/AppConstants';

export default defineComponent({
  components: {
    CustomerAvailableAppointments: defineAsyncComponent(
      () => import('../CustomerAvailableAppointments.vue')
    ),
    CustomerAppointments: defineAsyncComponent(
      () => import('../CustomerAppointments.vue')
    ),
    CustomerNotifications: defineAsyncComponent(
      () => import('../CustomerNotifications.vue')
    ),
  },
  setup() {
    const availableAppointmentsCount = ref(0);
    const appointmentsCount = ref(0);
    const notificationsCount = ref(0);
    const tab = ref('appointments');

    const setCount = (e: any): void => {
      switch (e.dataType) {
        case AppConstants.DataTypeEnum.Appointments:
          appointmentsCount.value = e.count;
          break;
        case AppConstants.DataTypeEnum.AvailableAppointments:
          availableAppointmentsCount.value = e.count;
          break;
        case AppConstants.DataTypeEnum.Notifications:
          notificationsCount.value = e.count;
          break;
        default:
          break;
      }
    };
    return {
      tab,
      availableAppointmentsCount,
      appointmentsCount,
      notificationsCount,
      setCount,
    };
  },
});
</script>
