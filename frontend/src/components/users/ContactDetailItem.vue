<template>
  <div>
    <q-item clickable v-ripple v-if="checkFieldRegular(label)">
      <q-item-section avatar top>
        <q-avatar :icon="icon" color="grey-2" :text-color="text_color" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">{{ value }}</q-item-label>
        <q-item-label caption class="text-grey-8">{{ $t(label) }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple v-if="checkFieldDate(label)">
      <q-item-section avatar top>
        <q-avatar :icon="icon" color="grey-2" :text-color="text_color" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">{{ value?.slice(0, 10) }}</q-item-label>
        <q-item-label caption class="text-grey-8">{{ $t(label) }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple v-if="checkFieldActive(label)">
      <q-item-section avatar top>
        <q-avatar v-if="!value" :icon="check_circle" color="red-4" />
        <q-avatar v-if="value" :icon="check_circle" color="green-4" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">{{
          value ? $t('active') : $t('noActive')
        }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple v-if="checkFieldAdmin(label)">
      <q-item-section avatar top>
        <q-avatar
          v-if="value !== adminKey"
          :icon="check_circle"
          color="red-4"
        />
        <q-avatar
          v-if="value === adminKey"
          :icon="check_circle"
          color="green-4"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">{{
          value === adminKey ? $t('admin') : $t('user')
        }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['icon', 'text_color', 'value', 'label'],
  setup() {
    const adminKey = process.env.adminKey;
    const checkFieldRegular = (label): boolean => {
      if (label === 'phoneNumber' || label === 'email') {
        return true;
      }
      return false;
    };
    const checkFieldDate = (label): boolean => {
      if (label === 'lastLogin' || label === 'createdDate') {
        return true;
      }
      return false;
    };
    const checkFieldAdmin = (field): boolean => {
      if (field === 'admin') {
        return true;
      }
      return false;
    };
    const checkFieldActive = (field): boolean => {
      if (field === 'active') {
        return true;
      }
      return false;
    };
    return {
      adminKey,
      checkFieldRegular,
      checkFieldDate,
      checkFieldAdmin,
      checkFieldActive,
    };
  },
});
</script>
