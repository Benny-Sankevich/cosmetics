<template>
  <div class="q-gutter-md">
    <q-btn v-if="isHomePage" round size="sm">
      <q-avatar size="sm">
        <q-icon name="login" />
      </q-avatar>
      <router-link
        exact
        :to="loginRoute"
        class="absolute full-width full-height"
      ></router-link>
      <q-tooltip>{{ $t('login') }}</q-tooltip>
    </q-btn>
    <q-btn v-else round size="sm">
      <q-avatar size="sm">
        <q-icon name="info" />
      </q-avatar>
      <router-link
        exact
        :to="aboutPageRoute"
        class="absolute full-width full-height"
      ></router-link>
      <q-tooltip>{{ $t('about') }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { AppConstants } from '../../core/Export';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const isHomePage = computed(() => {
      return (
        useRouter().currentRoute.value.name === AppConstants.Routes.AboutPage
      );
    });
    return {
      isHomePage,
      aboutPageRoute: {
        name: AppConstants.Routes.AboutPage,
      },
      loginRoute: {
        name: AppConstants.Routes.Login,
      },
    };
  },
});
</script>
