<template>
  <div>
    <q-dialog v-model="show_dialog" persistent>
      <q-card>
        <q-toolbar :class="displayClasses(event)" style="min-width: 400px">
          <q-toolbar-title>
            {{ event.name }}
          </q-toolbar-title>
          <q-btn
            flat
            round
            color="white"
            icon="delete"
            @click="deleteEvent(event)"
          ></q-btn>
          <q-btn
            flat
            round
            color="white"
            icon="edit"
            @click="editEvent(event)"
          ></q-btn>
          <q-btn
            flat
            round
            color="white"
            icon="close"
            @click="closeDialog(null)"
          ></q-btn>
        </q-toolbar>
        <q-card-section class="inset-shadow">
          <div class="text-caption">
            <div class="row full-width justify-start" style="padding-top: 12px">
              <div class="col-12">
                <div class="row full-width justify-start">
                  <div class="col-5" style="padding-left: 20px">
                    <strong>{{ $t('customer') }}:</strong>
                  </div>
                  <div class="col-7">
                    {{ event.firstName }} {{ event.lastName }}
                  </div>
                </div>
                <div class="row full-width justify-start">
                  <div class="col-5" style="padding-left: 20px">
                    <strong>{{ $t('phoneNumber') }}:</strong>
                  </div>
                  <div class="col-7">
                    {{ event.phoneNumber }}
                  </div>
                </div>
                <div class="row full-width justify-start">
                  <div class="col-5" style="padding-left: 20px">
                    <strong>{{ $t('email') }}:</strong>
                  </div>
                  <div class="col-7">
                    {{ event.email }}
                  </div>
                </div>
                <div v-if="!event.allDay" class="row full-width justify-start">
                  <div class="col-5" style="padding-left: 20px">
                    <strong>{{ $t('startTime') }}:</strong>
                  </div>
                  <div class="col-7">
                    {{ event.startTime }}
                  </div>
                </div>
                <div v-if="!event.allDay" class="row full-width justify-start">
                  <div class="col-5" style="padding-left: 20px">
                    <strong>{{ $t('endTime') }}:</strong>
                  </div>
                  <div class="col-7">
                    {{ event.endTime }}
                  </div>
                </div>
                <div v-if="event.allDay" class="row full-width justify-start">
                  <div class="col-5" style="padding-left: 20px">
                    <strong>{{ $t('duration') }}:</strong>
                  </div>
                  <div class="col-7">{{ $t('allDay') }}</div>
                </div>
                <div v-if="event.note" class="row full-width justify-start">
                  <div class="col-5" style="padding-left: 20px">
                    <strong>{{ $t('note') }}:</strong>
                  </div>
                  <div class="col-7">
                    {{ event.note }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('close')"
            color="primary"
            @click="closeDialog(null)"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '../../store';
import { AppConstants, i18n, showInfo } from '../../core/Export';
import { useQuasar } from 'quasar';

export default defineComponent({
  props: {
    eventToShow: {
      type: Object,
      required: true,
    },
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    const $q = useQuasar();
    const store = useStore();
    const event = ref(props.eventToShow);
    const show_dialog = ref(true);
    const editEvent = (event) => {
      closeDialog(event);
    };
    const deleteEvent = (payload) => {
      $q.dialog({
        title: `${i18n.global.t('confirm')}`,
        message: `${i18n.global.t('msgAreYouSure?')}`,
        color: 'negative',
        ok: `${i18n.global.t('msgYesImSure')}`,
        cancel: true,
        focus: 'cancel',
      }).onOk(() => {
        store
          .dispatch(
            `${AppConstants.AppointmentModule}/${AppConstants.Appointment.ActionDeleteAppointment}`,
            payload
          )
          .then(() => {
            closeDialog(null);
            showInfo(i18n.global.t('msgDoneSuccessfully'));
          });
      });
    };
    const closeDialog = (payload) => {
      emit('onCloseDialog', payload);
    };
    const displayClasses = (event) => {
      return {
        [`bg-${event.bgcolor}`]: !isCssColor(event.bgcolor),
        'text-white': !isCssColor(event.bgcolor),
      };
    };

    const isCssColor = (color) => {
      return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/);
    };

    return {
      event,
      show_dialog,
      editEvent,
      deleteEvent,
      closeDialog,
      displayClasses,
    };
  },
});
</script>
