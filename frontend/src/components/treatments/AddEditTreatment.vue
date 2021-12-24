<template>
  <div>
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
          >
          </q-input>
          <q-input
            square
            clearable
            v-model="treatmentForm.duration"
            lazy-rules
            :rules="nameRules"
            :label="$t('treatmentDuration')"
          >
          </q-input>

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
  </div>
</template>
<script lang="ts">
import { useStore } from '../../store';
import { defineComponent, ref, PropType } from 'vue';
import { AppConstants, i18n, showInfo } from '../../core/Export';
import { Treatment } from '../../store/treatments/models';
import { nameRules, priceRules } from '../../services/validations-fields';
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
    const treatmentNameRef = ref(null);
    const treatmentPriceRef = ref(null);
    const treatmentDurationRef = ref(null);

    const onSaveTreatment = () => {
      if (treatmentForm.value._id) {
        store.dispatch(
          `${AppConstants.TreatmentModule}/${AppConstants.Treatments.ActionEditTreatment}`,
          treatmentForm.value
        );
      } else {
        store.dispatch(
          `${AppConstants.TreatmentModule}/${AppConstants.Treatments.ActionSaveTreatment}`,
          treatmentForm.value
        );
      }
      showInfo(i18n.global.t('msgSaveSavedSuccessfully'));
      closeWindow();
    };
    const closeWindow = () => {
      emit('onClose');
      treatmentForm.value = null;
    };
    return {
      treatmentForm,
      treatmentNameRef,
      treatmentDurationRef,
      treatmentPriceRef,
      nameRules,
      priceRules,
      closeWindow,
      onSaveTreatment,
    };
  },
});
</script>
