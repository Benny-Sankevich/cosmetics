<template>
  <q-card>
    <q-item>
      <q-item-section avatar>
        <q-avatar size="60px" class="shadow-10">
          <img src="../../assets/images/Benny.jpg" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-grey-8 text-weight-bold"
          >Benny Sankevich</q-item-label
        >
        <q-item-label caption> Full Stack Developer </q-item-label>
        <q-item-label class="text-grey-8">
          bennysankevich@gmail.com
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-item-label>
          <q-btn
            clickable
            icon="fab fa-linkedin"
            flat
            dense
            color="blue-9"
            type="a"
            target="_blank"
            href="https://www.linkedin.com/in/benny-sankevich"
          />
        </q-item-label>
        <q-item-label>
          <q-btn
            clickable
            icon="fab fa-github"
            flat
            dense
            color="dark"
            type="a"
            target="_blank"
            href="https://github.com/Benny-Sankevich"
          />
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator></q-separator>
    <q-card-section>
      <div class="q-pa-sm text-grey-8">
        <span class="text-h6"
          >The website was built for a freelance beautician.<br />
          Using Program language Frontend: Vue.js TS, Backend Node.js, Database
          MongoDB. <br />
          The website contains a variety of options following needs: </span
        ><br /><br />
        <span class="text-body1">
          1. Option for the business owner to view data in the dashboard,
          including income and expense data. <br />
          2. manage customers. (Add\Edit\Block)
          <br />
          3. Monthly calendar with option to add appointments.<br />
          4. Yearly reports with data segmentation.<br />
          5. Reports include an option to filter results and export them to an
          Excel file. <br />

          6. Purchase order. (Add\Edit\Delete) and the data exists in
          reports.<br />
          7. The site supports multiple languages. (Hebrew and English)<br />

          8. Customers can register.<br /><br />
        </span>
        <span class="text-weight-bold">
          The website is under construction, Additional options will be added in
          the future.</span
        >
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>
