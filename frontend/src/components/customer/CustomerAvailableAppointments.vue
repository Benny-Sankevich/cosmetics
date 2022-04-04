<template>
  <q-scroll-area style="height: 325px">
    <q-list class="rounded-borders" separator>
      <q-item
        v-for="(availableAppointment, index) in availableAppointments"
        :key="availableAppointment._id"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">{{
            index + 1
          }}</q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{
            functionsService.getDate(availableAppointment.dateTimeStart)
          }}</q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">
              {{ functionsService.getTime(availableAppointment.dateTimeStart) }}
              -
              {{
                functionsService.getTime(availableAppointment.dateTimeEnd)
              }}</span
            >
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn
              class="gt-xs"
              size="md"
              flat
              color="blue"
              dense
              round
              icon="add"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  apiService,
  AppConstants,
  functionsService,
} from '../../core/Export';

export default defineComponent({
  emits: ['countChanged'],
  setup(props, { emit }) {
    const availableAppointments = ref([]);
    apiService.getAllAppointmentsAvailable().then(
      (res) => (
        (availableAppointments.value = res),
        emit('countChanged', {
          dataType: AppConstants.DataTypeEnum.AvailableAppointments,
          count: availableAppointments.value.length,
        })
      )
    );
    return { availableAppointments, functionsService };
  },
});
</script>
