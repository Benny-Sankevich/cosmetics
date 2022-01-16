<template>
  <div class="q-pa-md">
    <q-table
      v-if="reportProperties"
      :rows="reportProperties.rows"
      :columns="columns"
      color="primary"
      row-key="name"
      :visible-columns="visibleColumns"
      :filter="filter"
      :rows-per-page-options="[15, 20, 30, 40, 0]"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">{{ $t(reportProperties.title) }}</div>

        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          :placeholder="$t('search')"
        >
          <template v-slot:append>
            <q-icon :name="$t('search')" />
          </template>
        </q-input>
        <q-space />
        <q-select
          v-model="visibleColumns"
          multiple
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
        />
        <q-space />

        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to csv"
          no-caps
          @click="exportTable"
        />
        <q-btn
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { exportFile } from 'quasar';
import { defineComponent, ref, computed } from 'vue';
import {
  i18n,
  AppConstants,
  functionsService,
  showError,
} from '../../core/Export';
import { useRouter } from 'vue-router';
import { useStore } from '../../store';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const filter = ref('');
    const reportProperties = computed(() => {
      return store.getters[
        `${AppConstants.ReportModule}/${AppConstants.Report.GetReportProperties}`
      ];
    });
    if (!reportProperties.value) {
      router.push({ name: AppConstants.Routes.Reports });
    }
    const visibleColumns = ref(reportProperties.value.visibleColumns);
    const columns = ref(
      functionsService.copyStoreData(reportProperties.value.columns)
    );
    for (const column of columns.value) {
      column.label = i18n.global.t(column.label);
    }

    const exportTable = () => {
      const content = [columns.value.map((col) => wrapCsvValue(col.label))]
        .concat(
          reportProperties.value.rows.map((row) =>
            columns.value
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(',')
          )
        )
        .join('\r\n');

      const status = exportFile('table-export.csv', content, 'text/csv');

      if (status) showError(i18n.global.t('msgBrowserDeniedFileDownload'));
    };
    const wrapCsvValue = (val, formatFn) => {
      let formatted = formatFn !== void 0 ? formatFn(val) : val;

      formatted =
        formatted === void 0 || formatted === null ? '' : String(formatted);

      formatted = formatted.split('"').join('""');

      return `"${formatted}"`;
    };

    return {
      reportProperties,
      columns,
      filter,
      visibleColumns,
      exportTable,
    };
  },
});
</script>
