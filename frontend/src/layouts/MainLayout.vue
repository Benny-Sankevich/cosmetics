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

        <div class="row">
          <q-btn
            round
            dense
            flat
            color="white"
            :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
            @click="$q.fullscreen.toggle()"
            v-if="$q.screen.gt.sm"
          >
          </q-btn>
          <UserAvatar />
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
import { defineComponent, defineAsyncComponent, computed, ref } from 'vue';
import { AppConstants } from '../core/Export';
import { useStore } from '../store';

export default defineComponent({
  components: {
    UserAvatar: defineAsyncComponent(
      () => import('../components/avatar/UserAvatar.vue')
    ),
    AsideMenu: defineAsyncComponent(() => import('./AsideMenu.vue')),
  },

  setup() {
    const store = useStore();
    const leftDrawerOpen = ref(false);
    const managerEssentialLinks = [
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
        title: 'availableAppointments',
        icon: 'list',
        link: '/manager/available-appointments',
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
    const customerEssentialLinks = [
      {
        title: 'homePage',
        icon: 'dashboard',
        link: '/customer/',
      },
    ];
    const systemRole = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetSystemRole}`
        ]
    );
    const essentialLinks = computed(() =>
      systemRole.value ? managerEssentialLinks : customerEssentialLinks
    );

    const toggleLeftDrawer = (): void => {
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
