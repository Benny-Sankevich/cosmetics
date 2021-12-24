<template>
  <div class="row justify-center">
    <div class="q-pa-md q-gutter-sm row">
      <q-btn no-caps class="button" style="margin: 2px" @click="$emit('prev')">
        &lt; {{ $t('prev') }}
      </q-btn>
      <q-btn no-caps class="button" style="margin: 2px" @click="$emit('today')">
        {{ $t('today') }}
      </q-btn>
      <q-btn no-caps class="button" style="margin: 2px" @click="$emit('next')">
        {{ $t('next') }} &gt;
      </q-btn>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
