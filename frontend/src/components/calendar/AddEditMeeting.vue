<template>
  <div>
    <q-dialog v-model="show_dialog" persistent>
      <q-card style="width: 400px">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>{{
            model === 'add' ? $t('addAppointment') : $t('editAppointment')
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
          <q-form @submit="saveEvent" class="q-gutter-md">
            <q-select
              outlined
              v-model="eventForm.userId"
              :options="usersOptions"
              :label="$t('customer')"
              option-value="_id"
              :option-label="(item) => `${item.firstName} ${item.lastName}`"
              map-options
              :emit-value="true"
              lazy-rules
              :rules="requiredRules"
              use-input
              input-debounce="0"
              @filter="searchUser"
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
            <q-select
              outlined
              v-model="eventForm.treatmentId"
              :options="treatments"
              :label="$t('treatments')"
              option-value="_id"
              option-label="name"
              map-options
              :emit-value="true"
              lazy-rules
              :rules="requiredRules"
            />
            <q-field style="padding-bottom: 20px">
              <q-checkbox
                v-model="eventForm.allDay"
                :label="$t('allDayEvent')"
              />
              <q-checkbox
                v-model="eventForm.isConfirmed"
                :label="$t('isConfirmed')"
              />
            </q-field>
            <q-input
              v-if="eventForm.allDay"
              v-model="eventForm.dateTimeStart"
              :label="$t('enterDate')"
              mask="####-##-##"
              color="blue-6"
              outlined
              style="padding-bottom: 20px"
            >
              <template #append>
                <q-icon name="event" class="cursor-pointer" />
              </template>
            </q-input>
            <div v-else>
              <q-input
                v-model="eventForm.dateTimeStart"
                :label="$t('eventStartDateAndTime')"
                :rules="requiredRules"
                mask="####-##-## ##:##"
                outlined
                color="blue-6"
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer" />
                </template>
              </q-input>

              <q-input
                v-model="eventForm.dateTimeEnd"
                :label="$t('eventEndDateAndTime')"
                mask="####-##-## ##:##"
                :rules="requiredRules"
                color="blue-6"
                outlined
              >
                <template #append>
                  <q-icon name="event" class="cursor-pointer" />
                </template>
              </q-input>
            </div>
            <q-input v-model="eventForm.note" :label="$t('note')" />

            <q-card-actions align="right">
              <q-btn
                v-if="model === 'add'"
                unelevated
                type="reset"
                color="secondary"
                class="text-white"
                :label="$t('reset')"
              />
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
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from '../../store';
import { AppConstants, i18n, showInfo } from '../../core/Export';
import { requiredRules } from '../../services/validations-fields';

export default defineComponent({
  props: {
    eventToEdit: {
      type: Object,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    const store = useStore();
    const show_dialog = ref(true);
    const eventForm = ref({ ...props.eventToEdit });
    const treatments = computed(
      () =>
        store.getters[
          `${AppConstants.TreatmentModule}/${AppConstants.Treatments.GetTreatments}`
        ]
    );
    const users = computed(
      () =>
        store.getters[
          `${AppConstants.UsersModule}/${AppConstants.Users.GetUsers}`
        ]
    );
    const usersOptions = ref(users.value);

    const searchUser = (val, update) => {
      if (val === '') {
        update(() => {
          usersOptions.value = users.value;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        usersOptions.value = users.value.filter(
          (v) =>
            v.firstName.toLowerCase().indexOf(needle) > -1 ||
            v.lastName.toLowerCase().indexOf(needle) > -1
        );
      });
    };
    const saveEvent = () => {
      const treatment = treatments.value.find(
        (x) => x._id == eventForm.value.treatmentId
      );
      eventForm.value.price = treatment.price;
      eventForm.value.bgColor = treatment.bgColor;
      if (eventForm.value._id) {
        store.dispatch(
          `${AppConstants.AppointmentModule}/${AppConstants.Appointment.ActionEditAppointment}`,
          eventForm.value
        );
      } else {
        store.dispatch(
          `${AppConstants.AppointmentModule}/${AppConstants.Appointment.ActionSaveAppointment}`,
          eventForm.value
        );
      }
      showInfo(i18n.global.t('msgSavedSuccessfully'));
      closeDialog();
    };
    const closeDialog = () => {
      emit('onCloseDialog', false);
    };
    return {
      show_dialog,
      requiredRules,
      treatments,
      eventForm,
      usersOptions,
      searchUser,
      closeDialog,
      saveEvent,
    };
  },
});
</script>
