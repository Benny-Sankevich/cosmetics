<template>
  <q-layout view="hHh Lpr 1Ff">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-if="systemRole" flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-btn v-if="!systemRole" flat dense round aria-label="Menu">
          <q-avatar size="md">
            <q-icon name="dashboard" />
          </q-avatar>
          <router-link exact :to="customerHomeRoute" class="absolute full-width full-height"></router-link>
        </q-btn>

        <q-toolbar-title @click="navigateToMainPage">
          {{ $t('mainHeaderWebsite') }}
        </q-toolbar-title>

        <div class="row">
          <q-btn round dense flat color="white" icon="person_add" @click="onAddUser()" v-if="isCalendarURl">
          </q-btn>
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm">
          </q-btn>
          <UserAvatar />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-if="systemRole" v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <q-list>
        <q-item-label header>
          <AsideMenu v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-item-label>
      </q-list>
    </q-drawer>
    <AddEditUser :user="addUserFormData" model="add" v-if="show_dialog" @onCloseDialog="closeDialog()" />
    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, ref } from 'vue';
import { AppConstants } from '../core/Export';
import { useStore } from '../store';
import { User } from '../store/users/models';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: {
    UserAvatar: defineAsyncComponent(
      () => import('../components/avatar/UserAvatar.vue')
    ),
    AsideMenu: defineAsyncComponent(() => import('./AsideMenu.vue')),
    AddEditUser: defineAsyncComponent(() => import('../components/users/AddEditUser.vue')),
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const show_dialog = ref(false);
    const addUserFormData = ref(new User());

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
        title: 'tasks',
        icon: 'task',
        link: '/manager/tasks',
      },
      {
        title: 'settings',
        icon: 'settings',
        link: '/manager/settings',
      },
    ];

    const systemRole = computed(
      () =>
        store.getters[
        `${AppConstants.AuthModule}/${AppConstants.Auth.GetSystemRole}`
        ]
    );

    const isCalendarURl = computed(
      () =>
        router.currentRoute.value.name == AppConstants.Routes.Calendar
    );

    const toggleLeftDrawer = (): void => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const navigateToMainPage = (): void => {
      router.push({ name: AppConstants.Routes.HomePage });
    }

    const onAddUser = (): void => {
      addUserFormData.value = new User();
      addUserFormData.value.email = '';
      addUserFormData.value.isActive = true;
      addUserFormData.value.imageName = process.env.defaultUserImage;
      show_dialog.value = true;
    }

    const closeDialog = (): void => {
      show_dialog.value = false;
    }

    return {
      systemRole,
      essentialLinks,
      leftDrawerOpen,
      show_dialog,
      addUserFormData,
      isCalendarURl,
      toggleLeftDrawer,
      closeDialog,
      onAddUser,
      navigateToMainPage,
      customerHomeRoute: {
        name: AppConstants.Routes.CustomerPage,
      },
    };
  },
});
</script>
