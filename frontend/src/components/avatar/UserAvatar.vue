<template>
  <div class="q-gutter-md">
    <q-btn round size="sm">
      <q-avatar size="sm">
        <q-icon name="mdi-account-outline" />
      </q-avatar>

      <q-menu transition-show="jump-down" transition-hide="jump-up">
        <div class="row" style="width: 300px">
          <q-toolbar class="bg-blue-grey-10 text-white q-pa-md">
            <q-avatar v-if="user">
              <img :src="`${pathUrl + user.imageName}`" />
            </q-avatar>

            <span v-if="user" class="q-pl-sm"
              >{{ user.firstName }} {{ user.lastName }}</span
            >

            <q-space></q-space>
            <q-btn @click="logout" flat round dense icon="logout" size="sm">
              <q-tooltip>{{ $t('logout') }}</q-tooltip>
            </q-btn>
          </q-toolbar>
        </div>
        <div class="row">
          <q-list style="width: 100%">
            <q-item clickable :to="profileSettingsRoute">
              <q-item-section>{{ $t('profileSettings') }}</q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-menu>
      <q-tooltip>{{ $t('settings') }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '../../store';
import { AppConstants, i18n, showInfo } from '../../core/Export';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const pathUrl = process.env.imagesUrl;
    const user = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ]
    );
    const logout = (): void => {
      store.dispatch(
        `${AppConstants.AuthModule}/${AppConstants.Auth.ActionAuthLoggedOut}`
      );
      showInfo(i18n.global.t('msgYouHaveBeenLogout'));
      router.push({ name: AppConstants.Routes.Login });
    };
    return {
      pathUrl,
      user,
      logout,
      logoutLink: '',
      profileSettingsRoute: {
        name: AppConstants.Routes.ProfileSettings,
      },
    };
  },
});
</script>
