<template>
  <div>
    <q-card-section>
      <q-form @submit="onRegister" class="q-px-sm q-pt-xl">
        <q-input
          square
          clearable
          v-model="registerForm.firstName"
          lazy-rules
          :rules="nameRules"
          :label="$t('firstName')"
        >
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input
          square
          clearable
          v-model="registerForm.lastName"
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
          clearable
          v-model="registerForm.phoneNumber"
          lazy-rules
          :rules="phoneNumberRules"
          :label="$t('phoneNumber')"
        >
          <template v-slot:prepend>
            <q-icon name="smartphone" />
          </template>
        </q-input>
        <q-input
          square
          clearable
          v-model="registerForm.email"
          lazy-rules
          :rules="emailRegisterRules"
          :label="$t('email')"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <q-input
          square
          clearable
          v-model="registerForm.password"
          :type="passwordFieldType"
          lazy-rules
          :rules="passwordRules"
          :label="$t('password')"
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
        <q-input
          square
          clearable
          v-model="repassword"
          :type="passwordFieldType"
          lazy-rules
          :rules="repasswordRules"
          :label="$t('repassword')"
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
        <q-card-actions class="q-px-lg">
          <q-btn
            unelevated
            type="submit"
            size="lg"
            color="primary"
            class="full-width text-white"
            :label="$t('register')"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '../../store';
import { AppConstants, showInfo, i18n } from '../../core/Export';
import { useRouter } from 'vue-router';
import {
  nameRules,
  phoneNumberRules,
  emailRegisterRules,
  passwordRules,
} from '../../services/validations-fields';
import { RegisterForm } from '../../store/auth/models';
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const registerForm = ref(new RegisterForm());
    const repassword = ref(null);
    const passwordFieldType = ref('password');
    const visibility = ref(false);
    const visibilityIcon = ref('visibility');

    const onRegister = (): void => {
      store
        .dispatch(
          `${AppConstants.AuthModule}/${AppConstants.Auth.ActionAuthRegistered}`,
          registerForm.value
        )
        .then((response) => {
          showInfo(
            `${i18n.global.t('msgWelcome')} ${response.firstName} ${
              response.lastName
            }`
          );
          if (
            store.getters[
              `${AppConstants.AuthModule}/${AppConstants.Auth.GetSystemRole}`
            ]
          ) {
            router.push({ name: AppConstants.Routes.HomePage });
          } else {
            router.push({ name: AppConstants.Routes.CustomerPage });
          }
        });
    };
    const switchVisibility = (): void => {
      visibility.value = !visibility.value;
      passwordFieldType.value = visibility.value ? 'text' : 'password';
      visibilityIcon.value = visibility.value ? 'visibility_off' : 'visibility';
    };

    return {
      registerForm,
      nameRules,
      phoneNumberRules,
      emailRegisterRules,
      passwordRules,
      repassword,
      repasswordRules: [
        (val) => !!val || i18n.global.t('msgRequired'),
        (val) => val.length > 7 || i18n.global.t('msgMustBeMinimum8Digits'),
        (val) => val.length < 5001 || i18n.global.t('msgCantExceed5000Chars'),
        (val) =>
          val == registerForm.value.password ||
          i18n.global.t('msgNotMatchedToPassword'),
      ],
      passwordFieldType,
      visibility,
      visibilityIcon,
      onRegister,
      switchVisibility,
    };
  },
});
</script>
