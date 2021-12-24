import { boot } from 'quasar/wrappers'
import Plugin from '@quasar/quasar-ui-qcalendar/src/QCalendarMonth'
import '@quasar/quasar-ui-qcalendar/src/css/calendar-day.sass'

export default boot(({ app }) => {
  app.use(Plugin)
})

export { Plugin };