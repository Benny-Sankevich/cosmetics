<template>
  <q-item clickable>
    <q-item-section avatar>
      <q-avatar>
        <img :src="pathUrl + imageName" />
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
  props: ['imageName', 'name'],
  setup() {
    const pathUrl = process.env.imagesUrl;
    return {
      pathUrl,
    };
  },
});
</script>

<style scoped></style>
