<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <LanguageSettings/>
      <TreatmentsList />
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  components: {
    TreatmentsList: defineAsyncComponent(
      () => import('../components/treatments/TreatmentsList.vue')
    ),
    LanguageSettings: defineAsyncComponent(
      () => import('../components/settings/LanguageSettings.vue')
    ),
  },
});
</script>
