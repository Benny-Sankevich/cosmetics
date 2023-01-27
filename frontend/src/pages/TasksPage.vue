<template>
  <q-page class="q-pa-sm">
    <div class="row q-ma-md">
      <q-btn color="primary" :label="$t('addTask')" @click="addTaskDialog" no-caps icon="add" class="q-mr-md" />
    </div>
    <AddEditTask v-if="show_dialog" :task="task" :model="actionType" @onCloseDialog="closeDialog" />
    <TasksList :tasks="tasks" @editTask="onEditTask" @loadData="loadTasksList" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';
import { apiService } from '../core/ApiService';
import { Task } from '../models/general-models';
export default defineComponent({
  components: {
    AddEditTask: defineAsyncComponent(
      () => import('../components/tasks/AddEditTask.vue')
    ),
    TasksList: defineAsyncComponent(
      () => import('../components/tasks/TasksList.vue')
    ),
  },
  setup() {
    const tasks = ref([] as Task[]);
    const task = ref(new Task());
    const show_dialog = ref(false);
    const actionType = ref('add');

    const loadTasksList = (): void => {
      apiService.getAllTasks().then((res) => {
        tasks.value = res;
      })
    }

    loadTasksList();

    const onEditTask = (taskToEdit: Task): void => {
      task.value = taskToEdit;
      actionType.value = 'edit';
      show_dialog.value = true;
    }

    const addTaskDialog = (): void => {
      task.value = new Task();
      actionType.value = 'add';
      show_dialog.value = true;
    };

    const closeDialog = (refreshList: boolean): void => {
      show_dialog.value = false;
      if (refreshList) {
        loadTasksList();
      }
    };

    return {
      actionType,
      show_dialog,
      tasks,
      task,
      addTaskDialog,
      closeDialog,
      onEditTask,
      loadTasksList
    }
  }
});
</script>
