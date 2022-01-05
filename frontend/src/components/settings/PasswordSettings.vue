<template>
  <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
    <q-card class="bg-grey-4">
      <q-form @submit="onResetPassword">
        <q-card-section class="text-h6 q-pa-sm">
          <div class="text-h6">{{ $t('changePassword') }}</div>
        </q-card-section>
        <q-card-section class="q-pa-sm row">
          <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-item-section>{{ $t('currentPassword') }}</q-item-section>
          </q-item>
          <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                dense
                outlined
                round
                v-model="resetPasswordForm.oldPassword"
                :type="passwordFieldType"
                lazy-rules
                :rules="passwordRules"
                :label="$t('currentPassword')"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-item-section>{{ $t('newPassword') }}</q-item-section>
          </q-item>
          <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                dense
                outlined
                round
                v-model="resetPasswordForm.password"
                :type="passwordFieldType"
                lazy-rules
                :rules="passwordRules"
                :label="$t('newPassword')"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </q-item-section>
          </q-item>
          <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
            <q-item-section>{{ $t('confirmNewPassword') }}</q-item-section>
          </q-item>
          <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
            <q-item-section>
              <q-input
                dense
                outlined
                round
                v-model="repassword"
                :type="passwordFieldType"
                lazy-rules
                :rules="repasswordRules"
                :label="$t('confirmNewPassword')"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="visibilityIcon"
                    @click="switchVisibility"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            type="submit"
            class="text-capitalize bg-info text-white"
            :label="$t('changePassword')"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '../../store';
import { AppConstants, apiService, showInfo, i18n } from '../../core/Export';
import { passwordRules } from '../../services/validations-fields';
import { ResetPassword } from '../../models/general-models';

export default defineComponent({
  setup() {
    const store = useStore();
    const resetPasswordForm = ref(new ResetPassword());
    const repassword = ref(null);
    const passwordFieldType = ref('password');
    const visibility = ref(false);
    const visibilityIcon = ref('visibility');

    const user =
      store.getters[
        `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
      ];
    const onResetPassword = (): void => {
      resetPasswordForm.value.email = user.email;
      apiService.resetPassword(resetPasswordForm.value).then(() => {
        showInfo(i18n.global.t('msgDoneSuccessfully'));
      });
    };
    const switchVisibility = (): void => {
      visibility.value = !visibility.value;
      passwordFieldType.value = visibility.value ? 'text' : 'password';
      visibilityIcon.value = visibility.value ? 'visibility_off' : 'visibility';
    };
    return {
      resetPasswordForm,
      repassword,
      passwordRules,
      repasswordRules: [
        (val) => !!val || '* Required',
        (val) => val.length > 7 || 'Must be minimum 8 numbers',
        (val) => val.length < 5001 || 'Can`t exceed 5000 chars',
        (val) =>
          val == resetPasswordForm.value.password ||
          'Repassword is not matched',
      ],
      passwordFieldType,
      visibility,
      visibilityIcon,
      onResetPassword,
      switchVisibility,
    };
  },
});
</script>
