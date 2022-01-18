<template>
  <router-view />
</template>
<script lang="ts">
import { Quasar } from 'quasar';
import { i18n } from './boot/i18n';
import { useStore } from './store';
import { defineComponent, watch, computed } from 'vue';
import { AppConstants } from './core/Export';
import { showError } from './utils/notification-utils';

export default defineComponent({
  name: 'App',

  setup() {
    const store = useStore();

    const userLangCode = computed(() => {
      return store.getters[
        `${AppConstants.UiModule}/${AppConstants.Ui.GetUserLangCode}`
      ];
    });
    const allTranslations = computed(() => {
      return store.getters[
        `${AppConstants.UiModule}/${AppConstants.Ui.GetAllTranslations}`
      ];
    });

    const setTranslationsFromState = async (): Promise<void> => {
      i18n.global.locale = userLangCode.value;
      i18n.global.setLocaleMessage(userLangCode.value, allTranslations.value);
      try {
        const langIso =
          userLangCode.value == 'en' ? 'en-US' : userLangCode.value;
        await import('quasar/lang/' + langIso).then((lang) => {
          Quasar.lang.set(lang.default);
        });
      } catch (err) {
        showError(err);
      }
    };

    watch(allTranslations, () => {
      setTranslationsFromState();
    });

    setTranslationsFromState();

    return {
      allTranslations,
    };
  },
});
</script>
