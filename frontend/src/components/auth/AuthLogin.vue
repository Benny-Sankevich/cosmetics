<template>
  <div>
    <q-card-section>
      <q-form @submit="onLogin" class="q-px-sm q-pt-xl">
        <q-input
          square
          clearable
          v-model="loginForm.email"
          lazy-rules
          :rules="emailRules"
          :label="$t('email')"
        >
          <template v-slot:prepend>
            <q-icon name="email" />
          </template>
        </q-input>
        <q-input
          square
          clearable
          v-model="loginForm.password"
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
        <q-card-actions class="q-px-lg">
          <q-btn
            unelevated
            type="submit"
            size="lg"
            color="primary"
            class="full-width text-white"
            :label="$t('login')"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { AppConstants, i18n, showInfo } from '../../core/Export';
import { useStore } from '../../store';
import { useRouter } from 'vue-router';
import { emailRules, passwordRules } from '../../services/validations-fields';
import { LoginForm } from '../../store/auth/models';
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const passwordFieldType = ref('password');
    const visibility = ref(false);
    const visibilityIcon = ref('visibility');
    let loginForm = ref(new LoginForm());
    loginForm.value.email = 'admin@gmail.com';
    loginForm.value.password = 'pass4admin!';
    const onLogin = (): void => {
      store
        .dispatch(
          `${AppConstants.AuthModule}/${AppConstants.Auth.ActionAuthLoggedIn}`,
          loginForm.value
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
      loginForm,
      emailRules,
      passwordRules,
      passwordFieldType,
      visibility,
      visibilityIcon,
      onLogin,
      switchVisibility,
    };
  },
});
</script>
