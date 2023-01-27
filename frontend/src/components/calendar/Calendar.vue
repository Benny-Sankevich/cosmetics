<template>
  <q-page class="q-pa-sm bg-grey-3">
    <NavigationBar @today="onToday" @prev="onPrev" @next="onNext" />
    <ShowMeetingData :eventToShow="eventToShow" @onCloseDialog="closeEventToShowDialog" v-if="show_event" />
    <AddEditMeeting :model="model" :eventToEdit="eventToEdit" @onCloseDialog="closeAddEditEvent($event)" v-if="show_add_edit_dialog" />
    <q-calendar-month ref="calendar" :key="keyValue" v-model="selectedDate" animated bordered focusable hoverable no-active-date :day-min-height="90" :day-height="100" @click-date="openAddEvent" @click-day="openAddEvent">
      <template #week="{ scope: { week, weekdays } }">
        <template v-for="(computedEvent, index) in getWeekEvents(week, weekdays)" :key="index">
          <div :class="badgeClasses(computedEvent)" :style="badgeStyles(computedEvent, week.length)">
            <div v-if="computedEvent.event" class="title q-calendar__ellipsis" @click="showEvent(computedEvent.event)">
              <q-icon v-if="computedEvent.event.isConfirmed" name="check_box" />
              {{
              `${computedEvent.event.firstName}
              ${computedEvent.event.lastName}` +
  (computedEvent.event.allDay
    ? ` - ${$t('allDay')}`
    : ` - ${computedEvent.event.startTime} -
              ${computedEvent.event.endTime}`)
              }}
              <q-tooltip>{{ computedEvent.event.name }}</q-tooltip>
            </div>
          </div>
        </template>
      </template>
    </q-calendar-month>
  </q-page>
</template>

<script lang="ts">
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
import {
  defineComponent,
  defineAsyncComponent,
  ref,
  watch,
} from 'vue';
import { apiService } from '../../core/Export';
import { Appointment } from '../../store/appointments/models';
import {
  CalendarEventInterface,
  SizeInterface,
} from '../../models/general-models';

export default defineComponent({
  components: {
    QCalendarMonth,
    NavigationBar: defineAsyncComponent(() => import('./NavigationBar.vue')),
    AddEditMeeting: defineAsyncComponent(() => import('./AddEditMeeting.vue')),
    ShowMeetingData: defineAsyncComponent(
      () => import('./ShowMeetingData.vue')
    ),
  },
  setup() {
    const keyValue = ref(0);
    const selectedDate = ref(today());
    const events = ref([]);
    const show_event = ref(false);
    const show_add_edit_dialog = ref(false);
    const eventToShow = ref(null);
    const eventToEdit = ref(null);
    const model = ref(null);
    const calendar = ref(null);
    const calendarMonthDate = ref(new Date());
    const appointments = ref([]);

    const getMonthAppointments = (): void => {
      apiService.getMonthlyAppointments(calendarMonthDate.value).then(res => {
        appointments.value = res;
        updateData();
      })
    }
    getMonthAppointments();

    const containerStyle = (): SizeInterface => {
      return {
        height: 'auto',
        width: 'auto',
      };
    };

    const updateData = (): void => {
      if (appointments.value.length > 0) {
        events.value = [];
        appointments.value.forEach((appointment) => {
          const newEvent = new CalendarEventInterface();
          (newEvent._id = appointment._id),
            (newEvent.userId = appointment.userId),
            (newEvent.treatmentId = appointment.treatmentId),
            (newEvent.name = appointment.treatment.name),
            (newEvent.firstName = appointment.user.firstName),
            (newEvent.lastName = appointment.user.lastName),
            (newEvent.start = appointment.dateTimeStart.slice(0, 10)),
            (newEvent.end = appointment.dateTimeEnd.slice(0, 10)),
            (newEvent.startTime = appointment.dateTimeStart.slice(11, 16)),
            (newEvent.endTime = appointment.dateTimeEnd.slice(11, 16)),
            (newEvent.bgcolor = appointment.bgColor),
            (newEvent.email = appointment.user.email),
            (newEvent.phoneNumber = appointment.user.phoneNumber),
            (newEvent.allDay = appointment.allDay),
            (newEvent.isConfirmed = appointment.isConfirmed),
            (newEvent.note = appointment.note),
            events.value.push(newEvent);
        });
      }
    };

    watch(appointments.value, () => {
      updateData();
    });
    const badgeClasses = (computedEvent: any): any => {
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

    const badgeStyles = (computedEvent: any, weekLength: any): any => {
      const s = { width: '' };
      if (computedEvent.size !== undefined) {
        s.width = (100 / weekLength) * computedEvent.size + '%';
      }
      return s;
    };

    const getWeekEvents = (week: Array<any>): any => {
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
            _id,
            left,
            right,
            size: week.length - (left + right),
            event,
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
      events: Array<any>,
      weekLength: number,
      infoWeek: Array<any>,
      index: number,
      availableDays: number,
      level: number
    ): void => {
      const iEvent = infoWeek[index];
      if (iEvent !== undefined && iEvent.left >= availableDays) {
        if (iEvent.left - availableDays) {
          events.push({ size: iEvent.left - availableDays });
        }
        events.push({ size: iEvent.size, event: iEvent.event });
        if (level !== 0) {
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
        }
      } else {
        events.push({ size: weekLength - availableDays });
      }
    };

    const showEvent = (event: Appointment): void => {
      eventToShow.value = event;
      show_event.value = true;
    };

    const openAddEvent = ({ scope }: any): void => {
      eventToEdit.value = new Appointment();
      eventToEdit.value.dateTimeStart = scope.timestamp.date + ' 08:00';
      eventToEdit.value.dateTimeEnd = scope.timestamp.date + ' 09:00';
      eventToEdit.value.isConfirmed = true;
      eventToEdit.value.allDay = false;
      model.value = 'add';
      show_add_edit_dialog.value = true;
    };

    const closeAddEditEvent = (isSubmitted: boolean): void => {
      show_add_edit_dialog.value = false;
      if (isSubmitted) getMonthAppointments();
    };

    const closeEventToShowDialog = (event: CalendarEventInterface): void => {
      show_event.value = false;
      if (event) {
        openAddEditEvent(event);
      }
    };

    const openAddEditEvent = (payload: CalendarEventInterface): void => {
      eventToEdit.value = payload;
      eventToEdit.value.dateTimeStart = payload.start + ' ' + payload.startTime;
      eventToEdit.value.dateTimeEnd = payload.end + ' ' + payload.endTime;
      model.value = 'edit';
      show_add_edit_dialog.value = true;
    };

    const onToday = (): void => {
      calendarMonthDate.value = new Date();
      getMonthAppointments();
      calendar.value.moveToToday();
    };

    const onPrev = (): void => {
      calendarMonthDate.value = new Date(calendarMonthDate.value.setMonth(calendarMonthDate.value.getMonth() - 1));
      getMonthAppointments();
      calendar.value.prev();
    };

    const onNext = (): void => {
      calendarMonthDate.value = new Date(calendarMonthDate.value.setMonth(calendarMonthDate.value.getMonth() + 1));
      getMonthAppointments();
      calendar.value.next();
    };

    return {
      calendar,
      onToday,
      onPrev,
      onNext,
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
