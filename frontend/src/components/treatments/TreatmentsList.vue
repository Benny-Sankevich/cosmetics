<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab
          name="treatments"
          :class="tab == 'treatments' ? 'text-blue' : ''"
          icon="list"
          :label="$t('treatmentList')"
        />
        <q-tab
          name="add"
          :class="tab == 'add' ? 'text-blue' : ''"
          icon="playlist_add"
          :label="$t('addTreatment')"
          :disable="tab == 'update'"
          @click="addEditTreatment(null, 'add')"
        >
        </q-tab>
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="treatments" class="q-pa-sm">
          <q-list class="rounded-borders" separator>
            <q-item v-for="(treatment, index) in treatments" :key="index">
              <q-item-section avatar>
                <q-avatar>
                  <img
                    src="https://avatars2.githubusercontent.com/u/34883558?s=400&v=4"
                  />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1"
                  >{{ $t('name') }}: {{ treatment.name }}</q-item-label
                >
                <q-item-label caption lines="2">
                  <span class="text-weight-bold"
                    >{{ $t('price') }}: {{ treatment.price }}₪</span
                  >
                </q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1"
                  >{{ $t('treatmentDuration') }}:
                  {{ treatment.duration }}</q-item-label
                >
              </q-item-section>
              <q-item-section side>
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    class="gt-xs"
                    size="md"
                    flat
                    color="blue"
                    dense
                    round
                    icon="edit"
                    @click="addEditTreatment(treatment, 'update')"
                  />
                  <q-btn
                    class="gt-xs"
                    size="md"
                    flat
                    color="red"
                    dense
                    round
                    icon="delete"
                    @click="deleteTreatment(treatment)"
                  />
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="update" class="q-pa-sm">
          <AddEditTreatment
            :treatment="formData"
            :model="model"
            @onClose="closeWindow"
          />
        </q-tab-panel>

        <q-tab-panel name="add" class="q-pa-sm">
          <AddEditTreatment
            :treatment="formData"
            :model="model"
            @onClose="closeWindow"
          />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed, ref } from 'vue';
import {
  AppConstants,
  i18n,
  showInfo,
  areYouSureDialog,
} from '../../core/Export';
import { useStore } from '../../store';
import { Treatment } from '../../store/treatments/models';

export default defineComponent({
  components: {
    AddEditTreatment: defineAsyncComponent(
      () => import('./AddEditTreatment.vue')
    ),
  },

  setup() {
    const store = useStore();
    const tab = ref('treatments');
    const formData = ref(new Treatment());
    const model = ref(null);
    const treatments = computed(
      () =>
        store.getters[
          `${AppConstants.TreatmentModule}/${AppConstants.Treatments.GetTreatments}`
        ]
    );
    const deleteTreatment = (payload: Treatment): void => {
      areYouSureDialog().onOk(() =>
        store
          .dispatch(
            `${AppConstants.TreatmentModule}/${AppConstants.Treatments.ActionDeleteTreatment}`,
            payload
          )
          .then(() => {
            showInfo(i18n.global.t('msgDoneSuccessfully'));
          })
      );
    };
    const addEditTreatment = (treatmentData: Treatment, type: string): void => {
      if (treatmentData) {
        formData.value = { ...treatmentData };
      } else {
        formData.value.isForReportsAndCustomers = true;
      }
      model.value = type;
      tab.value = type;
    };
    const closeWindow = () => {
      tab.value = 'treatments';
      formData.value = new Treatment();
    };
    return {
      formData,
      model,
      treatments,
      tab,
      deleteTreatment,
      addEditTreatment,
      closeWindow,
    };
  },
});
</script>
