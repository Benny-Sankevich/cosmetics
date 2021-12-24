<template>
  <q-item>
    <q-item-section>
      <q-item-label
        >{{ appointment.user.firstName }} {{ appointment.user.lastName }} -
        {{ appointment.treatment.name }}</q-item-label
      >
      <q-item-label caption lines="2">{{
        appointment.user.phoneNumber
      }}</q-item-label>
      <q-item-label caption lines="2">
        {{ appointment.user.email }}</q-item-label
      >
      <q-item-label v-if="appointment.note" caption lines="2">
        {{ $t('note') }}: {{ appointment.note }}</q-item-label
      >
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption
        >{{ appointment.dateTimeStart.slice(11, 16) }} -
        {{ appointment.dateTimeEnd.slice(11, 16) }}</q-item-label
      >
    </q-item-section>
  </q-item>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Appointment } from '../../store/appointments/models';

export default defineComponent({
  props: {
    appointment: {
      type: Object as PropType<Appointment>,
      required: true,
    },
  },
});
</script>
