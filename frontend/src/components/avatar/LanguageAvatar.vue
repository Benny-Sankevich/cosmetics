<template>
  <div>
    <div class="q-gutter-md">
      <q-btn round size="sm">
        <q-avatar size="sm">
          <q-icon name="language" />
        </q-avatar>

        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <div class="row" style="width: 250px">
            <q-toolbar class="bg-grey-4 text-white q-pa-md">
              <q-btn
                color="primary"
                label="English"
                @click="changeLanguage('en')"
              />
              <q-space></q-space><q-space></q-space>
              <q-btn
                color="primary"
                label="עברית"
                @click="changeLanguage('he')"
              />
            </q-toolbar>
          </div>
        </q-menu>
        <q-tooltip>{{ $t('languageSetting') }}</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '../../store';
import { AppConstants } from '../../core/Export';

export default defineComponent({
  setup() {
    const store = useStore();
    const changeLanguage = (lang): void => {
      localStorage.setItem('lang', JSON.stringify(lang));
      store.commit(
        `${AppConstants.UiModule}/${AppConstants.Ui.MutationSetUserLangCode}`,
        lang
      );
      store.dispatch(
        `${AppConstants.UiModule}/${AppConstants.Ui.ActionLoadTranslations}`
      );
    };
    return {
      changeLanguage,
    };
  },
});
</script>
