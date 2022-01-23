<template>
  <q-page class="window-width row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card
          square
          class="shadow-24"
          :style="[
            currentScreen == 'register'
              ? 'width: 400px; height: 700px'
              : 'width: 400px; height: 540px',
          ]"
        >
          <q-card-section class="bg-primary">
            <h4 class="text-h5 text-white q-my-md">
              {{ $t(currentScreen) }}
            </h4>
          </q-card-section>
          <q-card-section>
            <q-fab
              color="blue-grey-4"
              @click="
                switchTypeForm(
                  currentScreen == 'register' ? 'login' : 'register'
                )
              "
              icon="add"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
            >
            </q-fab>
            <AuthRegister v-if="currentScreen == 'register'" />
            <AuthLogin v-if="currentScreen == 'login'" />
          </q-card-section>

          <q-card-section
            v-if="currentScreen === 'login'"
            class="text-center q-pa-sm"
          >
            <p class="text-grey-6">{{ $t('forgotYourPasswordMessage') }}</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue';

export default defineComponent({
  components: {
    AuthLogin: defineAsyncComponent(
      () => import('../components/auth/AuthLogin.vue')
    ),
    AuthRegister: defineAsyncComponent(
      () => import('../components/auth/AuthRegister.vue')
    ),
  },
  setup() {
    const currentScreen = ref('login');
    const switchTypeForm = (type: string): void => {
      currentScreen.value = type;
    };
    return {
      currentScreen,
      switchTypeForm,
    };
  },
});
</script>
