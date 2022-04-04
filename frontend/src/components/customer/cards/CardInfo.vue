<template>
  <q-card style="width: 100%; height: 90px">
    <q-card-section>
      <div class="text-h7 text-grey-8">
        {{ $t('address') }}: {{ $t('companyAddress') }}
      </div>
      <br />
      <div class="row">
        <div class="text-h7 text-grey-8">
          {{ $t('phoneNumber') }}: 0586686305
        </div>
        <q-btn
          clickable
          icon="whatsapp"
          flat
          dense
          color="green-6"
          class="q-pl-lg"
          type="a"
          target="_blank"
          href="https://wa.me/0586686305"
        />
        <q-btn
          clickable
          icon="fab fa-instagram"
          flat
          dense
          color="purple-5"
          class="q-pl-sm"
          type="a"
          target="_blank"
          href="https://www.instagram.com/sarisankevich/"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
