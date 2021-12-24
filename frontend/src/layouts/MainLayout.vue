<template>
  <q-layout view="hHh Lpr 1Ff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $t('mainHeaderWebsite') }}
        </q-toolbar-title>

        <div>
          <user-avatar></user-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header>
          <AsideMenu
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';

export default defineComponent({
  components: {
    UserAvatar: defineAsyncComponent(
      () => import('../components/avatar/UserAvatar.vue')
    ),
    AsideMenu: defineAsyncComponent(() => import('./AsideMenu.vue')),
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = [
      {
        title: 'homePage',
        icon: 'dashboard',
        link: '/manager/',
      },
      {
        title: 'users',
        icon: 'people',
        link: '/manager/users',
      },
      {
        title: 'calendar',
        icon: 'event',
        link: '/manager/calendar',
      },
      {
        title: 'reports',
        icon: 'show_chart',
        link: '/manager/reports',
      },
      {
        title: 'purchase',
        icon: 'shopping_cart',
        link: '/manager/purchase',
      },
      {
        title: 'settings',
        icon: 'settings',
        link: '/manager/settings',
      },
    ];
    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };
    return {
      essentialLinks,
      leftDrawerOpen,
      toggleLeftDrawer,
    };
  },
});
</script>
