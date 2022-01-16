<template>
  <q-page padding>
    <div
      class="flex items-center justify-center text-center"
      style="height: calc(100vh - 218px)"
    >
      <div>
        <q-icon name="info" size="80px" color="faded" />
        <p class="text-faded text-bold">
          {{ $t('notImplemented') }}
        </p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
