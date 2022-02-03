<template>
  <div class="q-pa-sm q-gutter-sm">
    <q-table
      :rows="availableAppointments"
      :columns="columns"
      row-key="name"
      binary-state-sort
      :rows-per-page-options="[15, 20, 30, 40, 0]"
      :filter="filter"
    >
      <template v-slot:top>
        <div class="col-2 q-table__title">
          {{ $t('availableAppointments') }}
        </div>
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          :placeholder="$t('search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <q-btn
          round
          color="primary"
          @click="openAddEditDialog(null, 'add')"
          icon="add"
        >
          <q-tooltip>{{ $t('addAvailableAppointment') }}</q-tooltip>
        </q-btn>
        &nbsp;&nbsp;
        <q-btn
          round
          color="primary"
          @click="openAddRangeDialog"
          icon="post_add"
        >
          <q-tooltip>{{ $t('addByRange') }}</q-tooltip>
        </q-btn>
        <AddEditAvailableAppointments
          :model="model"
          :availableAppointment="formData"
          v-if="show_add_edit_dialog"
          @onCloseDialog="closeAddEditDialog"
        />
        <AddAvailableAppointmentsByRange
          v-if="show_add_range_dialog"
          @onCloseDialog="closeAddRangeDialog"
        />
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="date" :props="props">
            {{ functionsService.getDate(props.row.dateTimeStart) }}
          </q-td>
          <q-td key="dateTimeStart" :props="props">
            {{ functionsService.getTime(props.row.dateTimeStart) }}
          </q-td>
          <q-td key="dateTimeEnd" :props="props">
            <div class="text-pre-wrap">
              {{ functionsService.getTime(props.row.dateTimeEnd) }}
            </div>
          </q-td>
          <q-td key="createdDate" :props="props">
            {{
              functionsService.getDate(props.row.createdDate) +
              ' - ' +
              functionsService.getTime(props.row.createdDate)
            }}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn
              color="blue"
              :label="$t('edit')"
              @click="openAddEditDialog(props.row, 'edit')"
              size="sm"
              no-caps
            ></q-btn>
            <q-btn
              color="red"
              :label="$t('delete')"
              @click="deleteAvailableAppointment(props.row)"
              size="sm"
              no-caps
            ></q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue';
import {
  functionsService,
  apiService,
  areYouSureDialog,
  i18n,
  showInfo,
} from '../../core/Export';
import { AppointmentAvailable, Range } from '../../models/general-models';

export default defineComponent({
  components: {
    AddEditAvailableAppointments: defineAsyncComponent(
      () => import('./AddEditAvailableAppointments.vue')
    ),
    AddAvailableAppointmentsByRange: defineAsyncComponent(
      () => import('./AddAvailableAppointmentsByRange.vue')
    ),
  },
  setup() {
    const availableAppointments = ref([]);
    const filter = ref('');
    const model = ref(null);
    const show_add_edit_dialog = ref(false);
    const show_add_range_dialog = ref(false);
    const columns = computed(() => {
      return [
        {
          name: 'date',
          required: true,
          label: i18n.global.t('date'),
          align: 'center',
          field: 'date',
          sortable: true,
        },
        {
          name: 'dateTimeStart',
          required: true,
          label: i18n.global.t('dateTimeStart'),
          align: 'center',
          field: 'dateTimeStart',
          sortable: true,
        },
        {
          name: 'dateTimeEnd',
          align: 'center',
          label: i18n.global.t('dateTimeEnd'),
          field: 'dateTimeEnd',
          sortable: true,
        },
        {
          name: 'createdDate',
          label: i18n.global.t('createdDate'),
          align: 'center',
          field: 'createdDate',
          sortable: true,
        },
        {
          name: 'actions',
          label: '',
          field: 'actions',
        },
      ];
    });
    const formData = ref(null);

    const getAppointmentsAvailable = () => {
      apiService
        .getAllAppointmentsAvailable()
        .then((res) => (availableAppointments.value = res));
    };
    getAppointmentsAvailable();

    const addAppointmentsAvailable = (payload: AppointmentAvailable): void => {
      apiService.addAppointmentsAvailable(payload).then(() => {
        showInfo(i18n.global.t('msgSavedSuccessfully'));
        getAppointmentsAvailable();
      });
    };

    const addAppointmentsAvailableByRange = (payload: Range): void => {
      apiService.addAppointmentsAvailableByRange(payload).then(() => {
        showInfo(i18n.global.t('msgSavedSuccessfully'));
        getAppointmentsAvailable();
      });
    };

    const editAppointmentsAvailable = (payload: AppointmentAvailable): void => {
      apiService.updateAppointmentsAvailable(payload).then(() => {
        showInfo(i18n.global.t('msgSavedSuccessfully'));
        getAppointmentsAvailable();
      });
    };

    const deleteAvailableAppointment = (
      payload: AppointmentAvailable
    ): void => {
      areYouSureDialog().onOk(async () => {
        await apiService.deleteAppointmentsAvailable(payload);
        availableAppointments.value.splice(
          functionsService.findIndex(availableAppointments.value, payload._id),
          1
        );
        showInfo(i18n.global.t('msgDoneSuccessfully'));
      });
    };

    const openAddEditDialog = (
      appointmentsAvailableData: AppointmentAvailable,
      type: string
    ): void => {
      if (appointmentsAvailableData) {
        formData.value = appointmentsAvailableData;
      } else {
        formData.value = new AppointmentAvailable();
      }
      model.value = type;
      show_add_edit_dialog.value = true;
    };

    const closeAddEditDialog = (
      appointmentsAvailable: AppointmentAvailable
    ): void => {
      show_add_edit_dialog.value = false;
      if (appointmentsAvailable) {
        if (appointmentsAvailable._id) {
          editAppointmentsAvailable(appointmentsAvailable);
        } else {
          addAppointmentsAvailable(appointmentsAvailable);
        }
      }
    };

    const openAddRangeDialog = (): void => {
      show_add_range_dialog.value = true;
    };

    const closeAddRangeDialog = (range: Range): void => {
      show_add_range_dialog.value = false;
      if (range) {
        addAppointmentsAvailableByRange(range);
      }
    };

    return {
      availableAppointments,
      filter,
      show_add_edit_dialog,
      show_add_range_dialog,
      model,
      columns,
      formData,
      deleteAvailableAppointment,
      openAddEditDialog,
      closeAddEditDialog,
      openAddRangeDialog,
      closeAddRangeDialog,
      functionsService,
    };
  },
});
</script>
