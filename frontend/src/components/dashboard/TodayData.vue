<template>
  <div>
    <q-item>
      <q-item-section>
        <div class="text-h6">{{ $t('appointmentsToday') }}</div>
      </q-item-section>
    </q-item>
    <div v-if="appointmentsToday.length > 0">
      <q-scroll-area style="height: 360px; max-width: 600px">
        <q-list>
          <div v-for="(appointment, index) in appointmentsToday" :key="index">
            <q-separator v-if="index == 0" spaced inset />
            <TodayAppointmentsItem :appointment="appointment" />
            <q-separator spaced inset />
          </div>
        </q-list>
      </q-scroll-area>
    </div>
    <div class="q-pa-md doc-container" v-else>
      <q-separator spaced inset />
      <div class="column items-center">
        {{ $t('thereAreNoAppointmentsForToday') }}
      </div>
      <q-separator spaced inset />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { apiService } from '../../core/Export';

export default defineComponent({
  components: {
    TodayAppointmentsItem: defineAsyncComponent(
      () => import('./TodayAppointmentsItem.vue')
    ),
  },
  setup() {
    const appointmentsToday = ref([]);

    apiService
      .getAllAppointmentsToday()
      .then((res) => (appointmentsToday.value = res));
    return {
      appointmentsToday,
    };
  },
});
</script>
