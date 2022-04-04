<template>
  <q-card
    class="text-white"
    :style="{
      height: '380px',
      background: colors.getPaletteColor(treatment.bgColor),
    }"
  >
    <q-card-section>
      <div class="text-h6 text-center">
        {{ treatment.name }}
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h2 text-weight-bolder text-center">
        <q-icon name="shopping_bag"></q-icon>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <div class="text-h2 text-weight-bolder text-center">
        {{ treatment.price }} ₪
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6 text-weight-bolder text-center">
        {{ $t('treatmentDuration') }}: {{ treatment.duration }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Treatment } from '../../../store/treatments/models';
import { colors } from 'quasar';

export default defineComponent({
  props: {
    treatment: {
      type: Object as PropType<Treatment>,
      required: true,
    },
  },
  setup() {
    return { colors };
  },
});
</script>
