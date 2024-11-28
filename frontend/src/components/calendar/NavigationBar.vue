<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row">
      <q-btn flat dense :label="$t('today')" class="q-mx-md" color="primary" @click="setToday" />
      <div v-if="selectedLanguage == 'en'">
        <q-btn dense round icon="keyboard_arrow_left" color="primary" @click="onPrev" />
        <q-btn dense round icon="keyboard_arrow_right" color="primary" @click="onNext" />
      </div>
      <div v-else>
        <q-btn dense round icon="keyboard_arrow_right" color="primary" @click="onNext" />
        <q-btn dense round icon="keyboard_arrow_left" color="primary" @click="onPrev" />
      </div>

      <span class="q-mr-xl q-toolbar__title nowrap">{{
        calendarMonthDate
      }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { AppConstants } from '../../core/AppConstants';
import { useStore } from '../../store';

export default defineComponent({
  props: {
    selectedDate: {
      type: String,
      required: true,
    },
  },
  emits: ['today', 'prev', 'next'],
  setup(props, { emit }) {
    const selectedMonth = ref(new Date());
    const calendarMonthDate = ref('');
    const store = useStore();

    const selectedLanguage = computed(() => {
      return store.getters[
        `${AppConstants.UiModule}/${AppConstants.Ui.GetUserLangCode}`
      ];
    });

    const desktopSize = (): boolean => {
      if (window.innerWidth > 400) {
        return true;
      }
      return false;
    };
    const setTitle = (): void => {
      if (selectedMonth.value) {
        calendarMonthDate.value = `${selectedMonth.value.toLocaleString(
          'default',
          {
            month: desktopSize() ? 'long' : 'short',
          }
        )} ${selectedMonth.value.getFullYear()}`;
      }
    };
    setTitle();
    watch(selectedMonth, (): void => {
      setTitle();
    });
    const onPrev = (): void => {
      selectedMonth.value = prevMonth();
      emit('prev');
    };
    const onNext = (): void => {
      selectedMonth.value = nextMonth();
      emit('next');
    };
    const setToday = (): void => {
      selectedMonth.value = new Date();
      emit('today');
    };

    const nextMonth = (): Date => {
      if (selectedMonth.value.getMonth() == 11) {
        return new Date(selectedMonth.value.getFullYear() + 1, 0, 1);
      } else {
        return new Date(
          selectedMonth.value.getFullYear(),
          selectedMonth.value.getMonth() + 1,
          1
        );
      }
    };

    const prevMonth = (): Date => {
      if (selectedMonth.value.getMonth() == 0) {
        return new Date(selectedMonth.value.getFullYear() - 1, 11, 1);
      } else {
        return new Date(
          selectedMonth.value.getFullYear(),
          selectedMonth.value.getMonth() - 1,
          1
        );
      }
    };

    return {
      calendarMonthDate,
      selectedLanguage,
      onPrev,
      onNext,
      setToday
    };
  },
});
</script>
