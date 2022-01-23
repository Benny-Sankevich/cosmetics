<template>
  <div class="column q-pa-lg">
    <div class="row">
      <q-card square class="shadow-24" style="'width: 400px; height: 540px'">
        <q-card-section class="bg-primary">
          <h4 class="text-h5 text-white q-my-md">
            {{ currentUser.firstName }} {{ currentUser.lastName }}
          </h4>
        </q-card-section>
        <q-card-section>
          <q-avatar size="74px" class="absolute-center shadow-10">
            <img :src="`${pathUrl + currentUser.imageName}`" />
          </q-avatar>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onLogin" class="q-px-sm q-pt-xl">
            <q-input
              square
              clearable
              v-model="loginForm.password"
              :type="passwordFieldType"
              lazy-rules
              :rules="passwordRules"
              :label="$t('password')"
            >
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
                class="full-width text-capitalize"
                :label="$t('unlock')"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
        <q-card-section class="text-center q-pa-sm">
          <p class="text-grey-6" @click="routeToLoginPage">{{ $t('login') }}</p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from '../../store';
import { AppConstants } from '../../core/AppConstants';
import { passwordRules } from '../../services/validations-fields';
import { LoginForm } from '../../store/auth/models';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const pathUrl = process.env.imagesUrl;
    const passwordFieldType = ref('password');
    const visibility = ref(false);
    const visibilityIcon = ref('visibility');
    const currentUser = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ]
    );
    if (!currentUser.value) {
      router.push({ name: AppConstants.Routes.Login });
    }

    const loginForm = ref(new LoginForm());
    loginForm.value.email = currentUser.value.email;
    const onLogin = (): void => {
      store
        .dispatch(
          `${AppConstants.AuthModule}/${AppConstants.Auth.ActionAuthLoggedIn}`,
          loginForm.value
        )
        .then(() => {
          router.go(-1);
        });
    };
    const switchVisibility = (): void => {
      visibility.value = !visibility.value;
      passwordFieldType.value = visibility.value ? 'text' : 'password';
      visibilityIcon.value = visibility.value ? 'visibility_off' : 'visibility';
    };
    const routeToLoginPage = (): void => {
      store.dispatch(
        `${AppConstants.AuthModule}/${AppConstants.Auth.ActionAuthLoggedOut}`
      );
      router.push({ name: AppConstants.Routes.Login });
    };
    return {
      pathUrl,
      currentUser,
      visibility,
      visibilityIcon,
      passwordFieldType,
      passwordRules,
      loginForm,
      onLogin,
      switchVisibility,
      routeToLoginPage,
    };
  },
});
</script>
