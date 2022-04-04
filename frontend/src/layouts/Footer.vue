<template>
  <q-card class="q-mt-md row">
    <q-card-section class="col-12 text-center q-pa-sm">
      <span class="text-body1 q-mt-sm text-grey-8 text-weight-bold q-pl-xl">
        &copy; {{ year }} {{ $t('allRightsReserved') }}.
      </span>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const year = new Date().getFullYear();
    return {
      year,
    };
  },
});
</script>
