<template>
  <q-dialog v-model="show_dialog" persistent>
    <q-card style="width: 400px">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>{{
          model === 'add'
            ? $t('addAvailableAppointment')
            : $t('updateAvailableAppointment')
        }}</q-toolbar-title>
        <q-btn
          flat
          round
          color="white"
          icon="close"
          @click="closeDialog(null)"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="inset-shadow">
        <q-form @submit="onSaveAvailableAppointment" class="q-gutter-md">
          <q-input
            square
            v-model="availableAppointmentForm.dateTimeStart"
            :label="$t('dateTimeStart')"
            :disable="true"
            lazy-rules
            :rules="requiredRules"
          >
            <template v-slot:before>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="availableAppointmentForm.dateTimeStart"
                    mask="YYYY-MM-DD HH:mm"
                  >
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

            <template v-slot:after>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="availableAppointmentForm.dateTimeStart"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
                  >
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
            v-model="availableAppointmentForm.dateTimeEnd"
            :label="$t('dateTimeEnd')"
            :disable="true"
            lazy-rules
            :rules="requiredRules"
          >
            <template v-slot:before>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="availableAppointmentForm.dateTimeEnd"
                    mask="YYYY-MM-DD HH:mm"
                  >
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

            <template v-slot:after>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time
                    v-model="availableAppointmentForm.dateTimeEnd"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
                  >
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
          <q-card-actions align="right">
            <q-btn
              unelevated
              type="submit"
              color="primary"
              class="text-white"
              >{{ model === 'add' ? $t('save') : $t('update') }}</q-btn
            >
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import { AppointmentAvailable } from '../../models/general-models';
import { requiredRules } from '../../core/Export';
export default defineComponent({
  props: {
    availableAppointment: {
      type: Object as PropType<AppointmentAvailable>,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    const availableAppointmentForm = ref(props.availableAppointment);
    const show_dialog = ref(true);

    const onSaveAvailableAppointment = (): void => {
      closeDialog(availableAppointmentForm.value);
    };

    const closeDialog = (dataToSave: AppointmentAvailable): void => {
      emit('onCloseDialog', dataToSave);
    };

    return {
      requiredRules,
      show_dialog,
      availableAppointmentForm,
      closeDialog,
      onSaveAvailableAppointment,
    };
  },
});
</script>
