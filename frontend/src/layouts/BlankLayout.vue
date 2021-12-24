<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          {{ $t('mainHeaderWebsite') }}
        </q-toolbar-title>
        <q-space></q-space>
        <q-space></q-space>

        <div>
          <language-avatar></language-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { defineComponent,defineAsyncComponent } from 'vue';

export default defineComponent({
  components: {
    LanguageAvatar: defineAsyncComponent(
      () => import('../components/avatar/LanguageAvatar.vue')
    ),
  },
});
</script>
