<template>
  <q-dialog v-model="show_dialog" persistent>
    <q-card style="width: 400px">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>{{
            model === 'add' ? $t('addTask') : $t('editTask')
        }}</q-toolbar-title>
        <q-btn flat round color="white" icon="close" @click="closeDialog"></q-btn>
      </q-toolbar>
      <q-card-section class="inset-shadow">
        <q-form @submit="onSaveTask" @reset="onReset">
          <q-input square v-model="taskForm.title" :label="$t('title')" :rules="nameRules" />
          <q-input square v-model="taskForm.message" :label="$t('message')" type="textarea" />
          <q-checkbox :label="$t('isCompleted')" v-model="taskForm.isCompleted" />
          <q-card-actions align="right">
            <q-btn v-if="model === 'add'" unelevated type="reset" color="secondary" class="text-white" :label="$t('reset')" />
            <q-btn unelevated type="submit" color="primary" class="text-white" :label="model === 'add' ? $t('save') : $t('update')" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { apiService, functionsService, i18n, nameRules, showInfo } from '../../core/Export';
import { Task } from '../../models/general-models';

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    const taskForm = ref(functionsService.copyStoreData(props.task));
    const show_dialog = ref(true);

    const onSaveTask = (): void => {
      if (taskForm.value._id) {
        apiService.updateTask(taskForm.value).then(() => {
          showInfo(i18n.global.t('msgSavedSuccessfully'));
          closeDialog(true);
        });
      }
      else {
        apiService.addTask(taskForm.value).then(() => {
          showInfo(i18n.global.t('msgSavedSuccessfully'));
          closeDialog(true);
        });
      }
    };

    const closeDialog = (isSaved = false): void => {
      emit('onCloseDialog', isSaved);
      onReset();
    };

    const onReset = (): void => {
      taskForm.value = new Task();
    };

    return {
      nameRules,
      taskForm,
      show_dialog,
      onSaveTask,
      closeDialog,
      onReset
    }
  }
})
</script>
