<template>
  <q-scroll-area style="height: 325px">
    <q-list class="rounded-borders" separator>
      <q-item v-for="(notification, index) in notifications" :key="index">
        <q-item-section avatar>
          <q-avatar color="teal" text-color="white" :icon="notification.icon" />
        </q-item-section>

        <q-item-section>{{ notification.title }}</q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { AppConstants } from '../../core/Export';

export default defineComponent({
  emits: ['countChanged'],
  setup(props, { emit }) {
    // const notifications = [
    //   {
    //     title: 'Avatar-type icon',
    //     icon: 'info',
    //   },
    //   {
    //     title: 'Avatar-type icon',
    //     icon: 'report',
    //   },
    //   {
    //     title: 'Avatar-type icon',
    //     icon: 'remove',
    //   },
    //   {
    //     title: 'Avatar-type icon',
    //     icon: 'remove_circle_outline',
    //   },
    // ];
    const notifications = [];
    emit('countChanged', {
      dataType: AppConstants.DataTypeEnum.Notifications,
      count: notifications.length,
    });

    return {
      notifications,
    };
  },
});
</script>
