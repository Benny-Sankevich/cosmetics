<template>
  <q-card>
    <q-card-section>
      <q-form @submit="onSaveTreatment">
        <q-input
          autofocus
          square
          clearable
          v-model="treatmentForm.name"
          lazy-rules
          :rules="nameRules"
          :label="$t('name')"
        >
        </q-input>
        <q-input
          square
          clearable
          v-model="treatmentForm.price"
          lazy-rules
          :rules="priceRules"
          :label="$t('price')"
        />
        <q-input
          square
          clearable
          v-model="treatmentForm.duration"
          lazy-rules
          :rules="nameRules"
          :label="$t('treatmentDuration')"
        />
        <q-select
          square
          v-model="treatmentForm.bgColor"
          :options="colorsOptions"
          option-value="color"
          option-label="color"
          :label="$t('backgroundColor')"
          :bg-color="treatmentForm.bgColor"
          map-options
          :emit-value="true"
          lazy-rules
          :rules="requiredRules"
          use-input
          input-debounce="0"
          @filter="searchColor"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{ $t('noResults') }}
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-checkbox
          v-model="treatmentForm.isForReportsAndCustomers"
          :label="$t('isForReportsAndCustomers')"
        />

        <q-card-actions align="right">
          <q-btn
            unelevated
            @click="closeWindow"
            color="secondary"
            class="text-white"
            :label="$t('cancel')"
          />
          <q-btn
            unelevated
            type="submit"
            color="primary"
            class="text-white"
            :label="model === 'add' ? $t('save') : $t('update')"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { useStore } from '../../store';
import { defineComponent, ref, PropType } from 'vue';
import {
  AppConstants,
  i18n,
  showInfo,
  nameRules,
  priceRules,
  requiredRules,
  functionsService,
  apiService,
} from '../../core/Export';
import { Treatment } from '../../store/treatments/models';
import { colors } from 'quasar';

export default defineComponent({
  props: {
    treatment: {
      type: Object as PropType<Treatment>,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  emits: ['onClose'],
  setup(props, { emit }) {
    const store = useStore();
    const treatmentForm = ref(props.treatment);
    const colorsList = ref([]);

    apiService.getColors().then((res) => (colorsList.value = res));

    const colorsOptions = ref(colorsList);

    const onSaveTreatment = (): void => {
      treatmentForm.value.backgroundColor = colors.getPaletteColor(
        treatmentForm.value.bgColor
      );
      let actionType = AppConstants.Treatments.ActionSaveTreatment;
      if (treatmentForm.value._id) {
        actionType = AppConstants.Treatments.ActionEditTreatment;
      }
      store.dispatch(
        `${AppConstants.TreatmentModule}/${actionType}`,
        treatmentForm.value
      );
      showInfo(i18n.global.t('msgSavedSuccessfully'));
      closeWindow();
    };
    const closeWindow = (): void => {
      emit('onClose');
      onReset();
    };

    const onReset = (): void => {
      treatmentForm.value = new Treatment();
    };

    const searchColor = (searchInput: string, update: any) => {
      if (searchInput === '') {
        console.log(searchInput);

        update(() => {
          colorsOptions.value = colorsList.value;
        });
        return;
      }

      update(() => {
        colorsOptions.value = functionsService.getColorsSearchResult(
          searchInput,
          colorsList.value
        );
      });
    };

    return {
      colorsOptions,
      treatmentForm,
      nameRules,
      priceRules,
      requiredRules,
      closeWindow,
      onSaveTreatment,
      searchColor,
    };
  },
});
</script>
