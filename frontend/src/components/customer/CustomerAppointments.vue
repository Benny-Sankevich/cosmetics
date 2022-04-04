<template>
  <q-scroll-area style="height: 325px">
    <q-list class="rounded-borders" separator>
      <q-item v-for="(appointment, index) in appointments" :key="index">
        <q-item-section avatar>
          <q-avatar>
            <img
              src="https://images-static.nykaa.com/media/catalog/product/a/c/ac449f88904245703110_1.jpg?tr=w-500,pr-true"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{
            appointment.treatment.name
          }}</q-item-label>
          <q-item-label caption lines="2" class="text-center">
            <span class="text-weight-bold"
              >{{ functionsService.getDate(appointment.dateTimeStart) }}
              {{ functionsService.getTime(appointment.dateTimeStart) }}
              -
              {{ functionsService.getTime(appointment.dateTimeEnd) }}</span
            >
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn size="md" flat dense round color="green" icon="close" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { apiService, AppConstants } from '../../core/Export';
import { useStore } from '../../store';
import { functionsService } from '../../core/Export';

export default defineComponent({
  emits: ['countChanged'],
  setup(props, { emit }) {
    const store = useStore();
    const appointments = ref([]);
    const user = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ]
    );

    apiService
      .getAppointmentsByUser(user.value._id)
      .then(
        (res) => (
          (appointments.value = res),
          emit('countChanged', {
            dataType: AppConstants.DataTypeEnum.Appointments,
            count: appointments.value.length,
          })
        )
      );

    return {
      appointments,
      functionsService,
    };
  },
});
</script>
