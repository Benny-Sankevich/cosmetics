<template>
  <q-dialog v-model="show_dialog" persistent>
    <q-card style="width: 400px">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>{{ $t('addByRange') }}</q-toolbar-title>
        <q-btn
          flat
          round
          color="white"
          icon="close"
          @click="closeDialog(null)"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="inset-shadow">
        <q-form @submit="onSaveAvailableAppointmentByRange" class="q-gutter-md">
          <q-input
            square
            v-model="rangeForm.date"
            :label="$t('date')"
            lazy-rules
            :rules="requiredRules"
            :disable="true"
          >
            <template v-slot:before>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="rangeForm.date">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        :label="$t('close')"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            square
            v-model="rangeForm.timeStart"
            :label="$t('rangeStartTime')"
            lazy-rules
            :rules="requiredRules"
            :disable="true"
          >
            <template v-slot:before>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="rangeForm.timeStart">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        :label="$t('close')"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            square
            v-model="rangeForm.timeEnd"
            :label="$t('rangeEndTime')"
            lazy-rules
            :rules="requiredRules"
            :disable="true"
          >
            <template v-slot:before>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="rangeForm.timeEnd">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        :label="$t('close')"
                        color="primary"
                        flat
                      />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-select
            transition-show="scale"
            transition-hide="scale"
            square
            v-model="rangeForm.duration"
            :options="durationOptions"
            :option-label="(val) => `${val} ${$t('minutes')}`"
            :emit-value="true"
            map-options
            :rules="requiredRules"
            :label="$t('appointmentDuration')"
          />

          <q-card-actions align="right">
            <q-btn
              unelevated
              type="submit"
              color="primary"
              class="text-white"
              :label="$t('save')"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { requiredRules } from '../../core/Export';
import { Range } from '../../models/general-models';
export default defineComponent({
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    const rangeForm = ref(new Range());
    const show_dialog = ref(true);
    const durationOptions = [30, 60];
    const onSaveAvailableAppointmentByRange = (): void => {
      closeDialog(rangeForm.value);
    };

    const closeDialog = (range: Range): void => {
      emit('onCloseDialog', range);
    };

    return {
      requiredRules,
      show_dialog,
      rangeForm,
      durationOptions,
      closeDialog,
      onSaveAvailableAppointmentByRange,
    };
  },
});
</script>
