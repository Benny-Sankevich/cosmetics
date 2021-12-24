<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-sm">
      <user-profile-settings></user-profile-settings>
      <language-settings></language-settings>
      <password-settings></password-settings>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
export default defineComponent({
  components: {
    LanguageSettings: defineAsyncComponent(
      () => import('../components/settings/LanguageSettings.vue')
    ),
    UserProfileSettings: defineAsyncComponent(
      () => import('../components/settings/UserProfileSettings.vue')
    ),
    PasswordSettings: defineAsyncComponent(
      () => import('../components/settings/PasswordSettings.vue')
    ),
  },
});
</script>
