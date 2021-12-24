<template>
  <q-item clickable>
    <q-item-section avatar>
      <q-avatar>
        <img :src="avatar" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContactItem',
  props: ['avatar', 'name'],
});
</script>

<style scoped></style>
