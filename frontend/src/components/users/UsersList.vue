<template>
  <q-page class="q-pa-sm bg-white">
    <q-resize-observer @resize="onResize" />
    <UsersDesktopSize
      v-if="!$q.screen.lt.sm"
      :users="users"
      :size="size"
      :pathUrl="pathUrl"
      :customerList="customerList"
    />
    <UsersPhoneSize
      v-else
      :users="users"
      :size="size"
      :pathUrl="pathUrl"
      :customerList="customerList"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue';
import { AppConstants } from '../../core/Export';
import { SizeInterface } from '../../models/general-models';
import { useStore } from '../../store';
export default defineComponent({
  components: {
    UsersDesktopSize: defineAsyncComponent(
      () => import('./UsersDesktopSize.vue')
    ),
    UsersPhoneSize: defineAsyncComponent(() => import('./UsersPhoneSize.vue')),
  },
  setup() {
    const store = useStore();
    const pathUrl = process.env.imagesUrl;
    const size = ref({ width: '200px', height: '200px' });
    const model = ref(null);

    const customerList = ref([
      {
        icon: 'phone',
        label: 'phoneNumber',
        field: 'phoneNumber',
        textColor: 'blue',
        type: String,
      },
      {
        icon: 'mail',
        label: 'email',
        field: 'email',
        textColor: 'grey-8',
        type: String,
      },
      {
        icon: 'schedule',
        label: 'lastLogin',
        field: 'lastLogin',
        textColor: 'grey-8',
        type: Date,
      },
      {
        icon: 'calendar_today',
        label: 'createdDate',
        field: 'createdDate',
        textColor: 'grey-8',
        type: Date,
      },
      {
        icon: 'calendar_today',
        label: 'active',
        field: 'isActive',
        textColor: 'grey-8',
        type: Boolean,
      },
      {
        icon: 'calendar_today',
        label: 'admin',
        field: 'isAdmin',
        textColor: 'grey-8',
        type: Boolean,
      },
    ]);
    const users = computed(
      () =>
        store.getters[
          `${AppConstants.UsersModule}/${AppConstants.Users.GetUsers}`
        ]
    );

    const onResize = (sizeDynamic: SizeInterface): void => {
      size.value = sizeDynamic;
    };
    return {
      pathUrl,
      users,
      size,
      model,
      customerList,
      onResize,
    };
  },
});
</script>
