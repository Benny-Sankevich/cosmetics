<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row">
      <q-btn
        flat
        dense
        :label="$t('today')"
        class="q-mx-md"
        color="primary"
        @click="setToday"
      />
      <q-btn
        dense
        round
        icon="keyboard_arrow_left"
        color="primary"
        @click="onPrev"
      />
      <q-btn
        dense
        round
        icon="keyboard_arrow_right"
        color="primary"
        @click="onNext"
      />
      <span class="q-mr-xl q-toolbar__title nowrap">{{
        calendarMonthDate
      }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  emits: ['today', 'prev', 'next'],
  setup(props, { emit }) {
    const selectedDate = ref(new Date());
    const calendarMonthDate = ref('');
    const desktopSize = (): boolean => {
      if (window.innerWidth > 400) {
        return true;
      }
      return false;
    };
    const setTitle = (): void => {
      if (selectedDate.value) {
        calendarMonthDate.value = `${selectedDate.value.toLocaleString(
          'default',
          {
            month: desktopSize() ? 'long' : 'short',
          }
        )} ${selectedDate.value.getFullYear()}`;
      }
    };
    setTitle();
    watch(selectedDate, (): void => {
      setTitle();
    });
    const onPrev = (): void => {
      selectedDate.value = prevMonth();
      emit('prev');
    };
    const onNext = (): void => {
      selectedDate.value = nextMonth();
      emit('next');
    };
    const setToday = (): void => {
      selectedDate.value = new Date();
      emit('today');
    };

    const nextMonth = (): Date => {
      if (selectedDate.value.getMonth() == 11) {
        return new Date(selectedDate.value.getFullYear() + 1, 0, 1);
      } else {
        return new Date(
          selectedDate.value.getFullYear(),
          selectedDate.value.getMonth() + 1,
          1
        );
      }
    };

    const prevMonth = (): Date => {
      if (selectedDate.value.getMonth() == 0) {
        return new Date(selectedDate.value.getFullYear() - 1, 11, 1);
      } else {
        return new Date(
          selectedDate.value.getFullYear(),
          selectedDate.value.getMonth() - 1,
          1
        );
      }
    };

    return {
      calendarMonthDate,
      onPrev,
      onNext,
      setToday,
    };
  },
});
</script>
