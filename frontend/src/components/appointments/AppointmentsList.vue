<template>
  <q-card class="q-mt-sm">
    <q-card-section class="text-h6 q-pb-none">
      <q-item>
        <q-item-section>
          <q-item-label>
            <div class="text-h6">{{ $t('awaitingApproval') }}</div>
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-btn
              v-if="selected.length > 0"
              color="primary"
              class="text-white"
              :label="$t('confirm')"
              @click="approveData"
            />
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
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
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section class="q-pa-none q-ma-none">
      <q-table
        class="no-shadow no-border"
        :rows="awaitingApproval"
        :columns="columns"
        row-key="_id"
        selection="multiple"
        v-model:selected="selected"
        :filter="filter"
      >
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { AppConstants, i18n, showInfo } from '../../core/Export';
import { useStore } from '../../store';

export default defineComponent({
  setup() {
    const store = useStore();
    const selected = ref([]);
    const filter = ref('');
    const awaitingApproval = computed(
      () =>
        store.getters[
          `${AppConstants.AppointmentModule}/${AppConstants.Appointment.GetAwaitingAppointments}`
        ]
    );
    const columns = computed(() => {
      return [
        {
          name: 'firstName',
          align: 'left',
          label: i18n.global.t('firstName'),
          field: 'user',
          sortable: true,
          format: (user) => `${user.firstName}`,
        },
        {
          name: 'lastName',
          align: 'left',
          label: i18n.global.t('lastName'),
          field: 'user',
          sortable: true,
          format: (user) => `${user.lastName}`,
        },
        {
          name: 'treatment',
          align: 'left',
          label: i18n.global.t('treatments'),
          field: 'treatment',
          sortable: true,
          format: (treatment) => `${treatment.name}`,
        },
        {
          name: 'dateTimeStart',
          align: 'left',
          label: i18n.global.t('dateTimeStart'),
          field: 'dateTimeStart',
          sortable: true,
          format: (val) =>
            `${val ? val.slice(0, 10) : ''} - ${val ? val.slice(11, 16) : ''}`,
        },
        {
          name: 'dateTimeEnd',
          align: 'left',
          label: i18n.global.t('dateTimeEnd'),
          field: 'dateTimeEnd',
          sortable: true,
          format: (val) =>
            `${val ? val.slice(0, 10) : ''} - ${val ? val.slice(11, 16) : ''}`,
        },
        {
          name: 'price',
          align: 'left',
          label: i18n.global.t('price'),
          field: 'price',
          sortable: true,
        },
        {
          name: 'note',
          align: 'left',
          label: i18n.global.t('note'),
          field: 'note',
          sortable: true,
        },
        {
          name: 'phoneNumber',
          align: 'left',
          label: i18n.global.t('phoneNumber'),
          field: 'user',
          sortable: true,
          format: (user) => `${user.phoneNumber}`,
        },
        {
          name: 'email',
          align: 'left',
          label: i18n.global.t('email'),
          field: 'user',
          sortable: true,
          format: (user) => `${user.email}`,
        },
      ];
    });
    const approveData = (): void => {
      store
        .dispatch(
          `${AppConstants.AppointmentModule}/${AppConstants.Appointment.ActionApproveAwaitingAppointments}`,
          selected.value
        )
        .then(() => {
          showInfo(i18n.global.t('msgSavedSuccessfully'));
        });
    };
    return {
      awaitingApproval,
      selected,
      filter,
      columns,
      approveData,
    };
  },
});
</script>
