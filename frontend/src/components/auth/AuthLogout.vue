<template>
  <q-btn @click="logout" flat round dense icon="logout" size="sm">
    <q-tooltip>{{ $t('logout') }}</q-tooltip>
  </q-btn>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../store';
import { AppConstants, i18n, showInfo } from '../../core/Export';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const logout = (): void => {
      store.dispatch(
        `${AppConstants.AuthModule}/${AppConstants.Auth.ActionAuthLoggedOut}`
      );
      showInfo(i18n.global.t('msgYouHaveBeenLogout'));
      router.push({ name: AppConstants.Routes.Login });
    };
    return {
      logout,
    };
  },
});
</script>
