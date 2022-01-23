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
            <AuthLogout />
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
import { defineComponent, defineAsyncComponent, computed } from 'vue';
import { useStore } from '../../store';
import { AppConstants } from '../../core/Export';

export default defineComponent({
  components: {
    AuthLogout: defineAsyncComponent(() => import('../auth/AuthLogout.vue')),
  },
  setup() {
    const store = useStore();
    const pathUrl = process.env.imagesUrl;
    const user = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ]
    );
    return {
      pathUrl,
      user,
      profileSettingsRoute: {
        name: AppConstants.Routes.ProfileSettings,
      },
    };
  },
});
</script>
