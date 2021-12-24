<template>
  <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
    <q-card class="bg-grey-4">
      <q-card-section class="text-h6">
        <q-avatar size="80px" class="shadow-10">
          <q-icon name="language" />
        </q-avatar>
        <div class="text-h6">{{ $t('languageSetting') }}</div>
      </q-card-section>
      <q-card-section>
        <q-select
          v-model="selectedLanguage"
          :options="langOptions"
          filled
          emit-value
          :label="$t('language')"
          map-options
          transition-show="jump-up"
          transition-hide="jump-up"
          style="min-width: 150px"
        >
          <template v-slot:append>
            <q-img
              v-if="selectedLanguage === 'en'"
              src="~/assets/flags/en.svg"
              style="width: 20px; height: 23px; margin-bottom: 10px"
            ></q-img>
            <q-img
              v-if="selectedLanguage === 'he'"
              src="~/assets/flags/il.jpg"
              style="width: 20px; height: 23px; margin-bottom: 10px"
            ></q-img>
          </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label v-html="scope.opt.label"></q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-img
                  v-if="scope.opt.value === 'en'"
                  src="~/assets/flags/en.svg"
                  style="width: 20px"
                ></q-img>
                <q-img
                  v-if="scope.opt.value === 'he'"
                  src="~/assets/flags/il.jpg"
                  style="width: 20px"
                ></q-img>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
    </q-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { AppConstants } from '../../core/Export';
import { useStore } from '../../store';

export default defineComponent({
  setup() {
    const store = useStore();
    const allTranslations =
      store.getters[
        `${AppConstants.UiModule}/${AppConstants.Ui.GetAllTranslations}`
      ];
    const selectedLanguage = ref(
      store.getters[
        `${AppConstants.UiModule}/${AppConstants.Ui.GetUserLangCode}`
      ]
    );

    const langOptions = [
      {
        value: 'en',
        label: 'English',
      },
      {
        value: 'he',
        label: 'Hebrew',
      },
    ];

    watch(selectedLanguage, (lang) => {
      store.commit(
        `${AppConstants.UiModule}/${AppConstants.Ui.MutationSetUserLangCode}`,
        lang
      );
      store.dispatch(
        `${AppConstants.UiModule}/${AppConstants.Ui.ActionLoadTranslations}`
      );
    });

    return {
      langOptions,
      allTranslations,
      selectedLanguage,
    };
  },
});
</script>
