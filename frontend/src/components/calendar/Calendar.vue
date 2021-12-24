<template>
  <q-page class="column" style="overflow: hidden">
    <div class="subcontent">
      <navigation-bar @today="onToday" @prev="onPrev" @next="onNext" />
      <ShowMeetingData
        :eventToShow="eventToShow"
        @onCloseDialog="closeEventToShowDialog"
        v-if="show_event"
      />
      <AddEditMeeting
        :model="model"
        :eventToEdit="eventToEdit"
        @onCloseDialog="closeAddEditEvent"
        v-if="show_add_edit_dialog"
      />
      <div class="calendar-container" :style="containerStyle">
        <q-calendar-month
          ref="calendar"
          class="calendar"
          style="height: calc(100vh - 50px)"
          :key="keyValue"
          v-model="selectedDate"
          animated
          bordered
          focusable
          hoverable
          no-active-date
          :day-height="100"
          @click-date="openAddEvent"
          @click-day="openAddEvent"
        >
          <template #week="{ scope: { week, weekdays } }">
            <template
              v-for="(computedEvent, index) in getWeekEvents(week, weekdays)"
              :key="index"
            >
              <div
                :class="badgeClasses(computedEvent)"
                :style="badgeStyles(computedEvent, week.length)"
              >
                <div
                  v-if="computedEvent.event"
                  class="title q-calendar__ellipsis"
                  @click="showEvent(computedEvent.event)"
                >
                  <q-icon
                    v-if="computedEvent.event.isConfirmed"
                    name="check_box"
                  />
                  {{
                    `${computedEvent.event.firstName}
                  ${computedEvent.event.lastName}` +
                    (computedEvent.event.allDay
                      ? ' - All day'
                      : ` - ${computedEvent.event.startTime} -
                  ${computedEvent.event.endTime}`)
                  }}
                  <q-tooltip>{{ computedEvent.event.name }}</q-tooltip>
                </div>
              </div>
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  QCalendarMonth,
  daysBetween,
  isOverlappingDates,
  parsed,
  today,
  indexOf,
} from '@quasar/quasar-ui-qcalendar/src/index.js';
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass';
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass';
import { defineComponent, defineAsyncComponent, computed, ref } from 'vue';
import { useStore } from '../../store';
import { AppConstants } from '../../core/Export';
import { Appointment } from '../../store/appointments/models';

export default defineComponent({
  components: {
    QCalendarMonth,
    NavigationBar: defineAsyncComponent(() => import('./NavigationBar.vue')),
    AddEditMeeting: defineAsyncComponent(() => import('./AddEditMeeting.vue')),
    ShowMeetingData: defineAsyncComponent(() =>
      import('./ShowMeetingData.vue')
    ),
  },
  setup() {
    const store = useStore();
    const keyValue = ref(0);
    const selectedDate = ref(today());
    const events = ref([]);
    const show_event = ref(false);
    const show_add_edit_dialog = ref(false);
    const eventToShow = ref(null);
    const eventToEdit = ref(null);
    const model = ref(null);

    const appointments = computed(
      () =>
        store.getters[
          `${AppConstants.AppointmentModule}/${AppConstants.Appointment.GetAppointments}`
        ]
    );

    const containerStyle = () => {
      const styles = {
        height: 'auto',
        width: 'auto',
      };
      return styles;
    };
    const updateData = () => {
      if (appointments.value.length > 0) {
        appointments.value.forEach((appointment) => {
          events.value.push({
            _id: appointment._id,
            userId: appointment.userId,
            treatmentId: appointment.treatmentId,
            name: appointment.treatment.name,
            firstName: appointment.user.firstName,
            lastName: appointment.user.lastName,
            start: appointment.dateTimeStart.slice(0, 10),
            end: appointment.dateTimeEnd.slice(0, 10),
            startTime: appointment.dateTimeStart.slice(11, 16),
            endTime: appointment.dateTimeEnd.slice(11, 16),
            bgcolor: appointment.bgColor,
            email: appointment.user.email,
            phoneNumber: appointment.user.phoneNumber,
            allDay: appointment.allDay,
            isConfirmed: appointment.isConfirmed,
            note: appointment.note,
          });
        });
      }
    };
    updateData();
    const badgeClasses = (computedEvent) => {
      if (computedEvent.event !== undefined) {
        return {
          'my-event': true,
          'text-white': true,
          [`bg-${computedEvent.event.bgcolor}`]: true,
          'rounded-border': true,
          'q-calendar__ellipsis': true,
        };
      }
      return {
        'my-void-event': true,
      };
    };
    const badgeStyles = (computedEvent, weekLength) => {
      const s = {};
      if (computedEvent.size !== undefined) {
        s.width = (100 / weekLength) * computedEvent.size + '%';
      }
      return s;
    };
    const getWeekEvents = (week) => {
      const firstDay = parsed(week[0].date + ' 00:00');
      const lastDay = parsed(week[week.length - 1].date + ' 23:59');
      const eventsWeek = [];
      events.value.forEach((event, _id) => {
        const startDate = parsed(event.start + ' 00:00');
        const endDate = parsed(event.end + ' 23:59');
        if (isOverlappingDates(startDate, endDate, firstDay, lastDay)) {
          const left = daysBetween(firstDay, startDate, true);
          const right = daysBetween(endDate, lastDay, true);
          eventsWeek.push({
            _id, // index event
            left, // Position initial day [0-6]
            right, // Number days available
            size: week.length - (left + right), // Size current event (in days)
            event, // Info
          });
        }
      });
      const events1 = [];
      if (eventsWeek.length > 0) {
        const infoWeek = eventsWeek.sort((a, b) => a.left - b.left);
        infoWeek.forEach((_, i) => {
          insertEvent(events1, week.length, infoWeek, i, 0, 0);
        });
      }
      return events1;
    };
    const insertEvent = (
      events,
      weekLength,
      infoWeek,
      index,
      availableDays,
      level
    ) => {
      const iEvent = infoWeek[index];
      if (iEvent !== undefined && iEvent.left >= availableDays) {
        // If you have space available, more events are placed
        if (iEvent.left - availableDays) {
          // It is filled with empty events
          events.push({ size: iEvent.left - availableDays });
        }
        // The event is built
        events.push({ size: iEvent.size, event: iEvent.event });
        if (level !== 0) {
          // If it goes into recursion, then the item is deleted
          infoWeek.splice(index, 1);
        }
        const currentAvailableDays = iEvent.left + iEvent.size;
        if (currentAvailableDays < weekLength) {
          const indexNextEvent = indexOf(
            infoWeek,
            (e) => e._id !== iEvent._id && e.left >= currentAvailableDays
          );
          insertEvent(
            events,
            weekLength,
            infoWeek,
            indexNextEvent !== -1 ? indexNextEvent : index,
            currentAvailableDays,
            level + 1
          );
        } // else: There are no more days available, end of iteration
      } else {
        events.push({ size: weekLength - availableDays });
        // end of iteration
      }
    };
    const showEvent = (event) => {
      eventToShow.value = event;
      show_event.value = true;
    };

    const openAddEvent = ({ scope }) => {
      eventToEdit.value = new Appointment();
      eventToEdit.value.dateTimeStart = scope.timestamp.date + ' 08:00';
      eventToEdit.value.dateTimeEnd = scope.timestamp.date + ' 09:00';
      eventToEdit.value.isConfirmed = false;
      eventToEdit.value.allDay = false;
      model.value = 'add';
      show_add_edit_dialog.value = true;
    };
    const closeAddEditEvent = () => {
      show_add_edit_dialog.value = false;
    };
    const closeEventToShowDialog = (event) => {
      show_event.value = false;
      if (event) {
        openAddEditEvent(event);
      }
    };
    const openAddEditEvent = (payload) => {
      eventToEdit.value = payload;
      eventToEdit.value.dateTimeStart = payload.start + ' ' + payload.startTime;
      eventToEdit.value.dateTimeEnd = payload.end + ' ' + payload.endTime;
      model.value = 'edit';
      show_add_edit_dialog.value = true;
    };
    return {
      model,
      show_event,
      eventToShow,
      show_add_edit_dialog,
      eventToEdit,
      keyValue,
      selectedDate,
      containerStyle,
      showEvent,
      closeEventToShowDialog,
      closeAddEditEvent,
      badgeClasses,
      badgeStyles,
      getWeekEvents,
      openAddEvent,
    };
  },
  methods: {
    onToday() {
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },
  },
});
</script>

<style lang="sass" scoped>
.my-event
  position: relative
  display: inline-flex
  white-space: nowrap
  font-size: 12px
  height: 16px
  max-height: 16px
  margin: 1px 0 0 0
  justify-content: center
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer
.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%
.my-void-event
  display: inline-flex
  white-space: nowrap
  height: 1px
.text-white
  color: white
.bg-blue
  background: blue
.bg-green
  background: green
.bg-orange
  background: orange
.bg-red
  background: red
.bg-teal
  background: teal
.bg-grey
  background: grey
.bg-purple
  background: purple
.rounded-border
  border-radius: 2px
</style>
