<template>
  <q-page  class="q-pa-sm">
    <AvailableAppointments />
  </q-page>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
export default defineComponent({
  components: {
    AvailableAppointments: defineAsyncComponent(
      () => import('../components/appointments/AvailableAppointments.vue')
    ),
  },
});
</script>
