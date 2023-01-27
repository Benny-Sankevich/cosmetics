<template>
  <q-list>
    <q-expansion-item v-for="(task, index) in tasks" :key="index" style="border-radius: 10px" popup header-class="bg-white">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar :icon="task.isCompleted ? 'check_box' : 'check_box_outline_blank'" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ task.title }}</q-item-label>
          <q-item-label caption>{{ task.createdDate }}</q-item-label>
        </q-item-section>
      </template>

      <q-separator />
      <q-card>
        <q-card-section>
          {{ task.message }}
        </q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn color="blue" :label="$t('update')" @click="onEditTask(task)" size="sm" no-caps />
          <q-btn color="red" :label="$t('delete')" size="sm" @click="deleteTask(task)" no-caps />
        </q-card-actions>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { apiService, areYouSureDialog, i18n, showInfo } from '../../core/Export';
import { Task } from '../../models/general-models';

export default defineComponent({
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
    },
  },
  emits: ['editTask', 'loadData'],
  setup(props, { emit }) {

    const deleteTask = (payload: Task): void => {
      areYouSureDialog().onOk(async () => {
        await apiService.deleteTask(payload).then(() => {
          showInfo(i18n.global.t('msgDoneSuccessfully'));
          loadData();
        });

      });
    };

    const loadData = (): void => {
      emit('loadData');
    }

    const onEditTask = (task: Task): void => {
      emit('editTask', task);
    }
    return {
      onEditTask,
      deleteTask
    }
  }
})
</script>
