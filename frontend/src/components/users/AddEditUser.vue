<template>
  <q-dialog v-model="show_dialog" persistent>
    <q-card style="width: 400px">
      <q-toolbar class="bg-primary text-white">
        <q-toolbar-title>{{
          model === 'add' ? $t('addUser') : $t('editUser')
        }}</q-toolbar-title>
        <q-btn
          flat
          round
          color="white"
          icon="close"
          @click="closeDialog"
        ></q-btn>
      </q-toolbar>
      <q-card-section class="inset-shadow">
        <q-form @submit="onSaveUser" @reset="onReset">
          <q-input
            autofocus
            square
            v-model="userForm.firstName"
            lazy-rules
            :rules="nameRules"
            :label="$t('firstName')"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            autofocus
            square
            v-model="userForm.lastName"
            lazy-rules
            :rules="nameRules"
            :label="$t('lastName')"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            square
            v-model="userForm.email"
            :label="$t('email')"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>
          <q-input
            square
            v-model="userForm.phoneNumber"
            lazy-rules
            :rules="phoneNumberRules"
            :label="$t('phoneNumber')"
          >
            <template v-slot:prepend>
              <q-icon name="smartphone" />
            </template>
          </q-input>

          <q-field style="padding-bottom: 20px">
            <q-checkbox v-model="userForm.isActive" :label="$t('active')" />
          </q-field>

          <q-card-actions align="right">
            <q-btn
              v-if="model === 'add'"
              unelevated
              type="reset"
              color="secondary"
              class="text-white"
              :label="$t('reset')"
            />
            <q-btn
              unelevated
              type="submit"
              color="primary"
              class="text-white"
              :label="model === 'add' ? $t('save') : $t('update')"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import {
  AppConstants,
  functionsService,
  i18n,
  showInfo,
  nameRules,
  emailWithoutRequiredRules,
  phoneNumberRules,
} from '../../core/Export';
import { useStore } from '../../store';
import { User } from '../../store/users/models';

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  },
  emits: ['onCloseDialog'],
  setup(props, { emit }) {
    const store = useStore();
    const userForm = ref(functionsService.copyStoreData(props.user));
    const show_dialog = ref(true);
    const onSaveUser = (): void => {
      let actionType = AppConstants.Users.ActionSaveUser;
      if (userForm.value._id) {
        actionType = AppConstants.Users.ActionEditUser;
      }
      store.dispatch(
        `${AppConstants.UsersModule}/${actionType}`,
        userForm.value
      ).then(()=>{
          showInfo(i18n.global.t('msgSavedSuccessfully'));
          closeDialog();
      });
    };

    const closeDialog = (): void => {
      emit('onCloseDialog', userForm.value);
      onReset();
    };
    const onReset = (): void => {
      userForm.value = new User();
    };
    return {
      show_dialog,
      userForm,
      nameRules,
      phoneNumberRules,
      emailWithoutRequiredRules,
      closeDialog,
      onSaveUser,
      onReset,
    };
  },
});
</script>
