<template>
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar
        v-if="type !== Boolean"
        :icon="icon"
        color="grey-2"
        :text-color="textColor"
      />
      <q-avatar
        v-else
        :icon="check_circle"
        :color="value ? 'green-4' : 'red-4'"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label lines="1">{{ getValue(type, value, label) }}</q-item-label>
      <q-item-label v-if="type !== Boolean" caption class="text-grey-8">{{
        $t(label)
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { i18n } from '../../core/Export';

export default defineComponent({
  props: ['icon', 'textColor', 'value', 'label', 'type'],
  setup() {
    const getValue = (type: any, value: any, label: string): any => {
      if (type === Boolean) {
        if (label === 'admin') {
          return value && value === process.env.adminKey
            ? i18n.global.t('admin')
            : i18n.global.t('user');
        }
        return value ? i18n.global.t('active') : i18n.global.t('noActive');
      }
      return value;
    };
    return {
      getValue,
    };
  },
});
</script>
