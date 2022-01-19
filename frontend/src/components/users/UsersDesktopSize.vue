<template>
  <div class="row">
    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
      <q-card class="no-border no-border">
        <q-tab-panels v-model="tab" animated class="bg-white">
          <q-tab-panel
            name="customers"
            class="q-pa-none full-height"
            :style="{ height: size['height'] - 80 + 'px !important' }"
          >
            <q-list>
              <q-item-label class="text-center q-pa-sm">
                <q-input
                  dense
                  rounded
                  outlined
                  v-model="search"
                  @keyup="onSearchUser"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label header class="text-center"
                >{{ usersList.length }} {{ $t('users') }}</q-item-label
              >
              <span
                v-for="(user, index) in usersList"
                :key="index"
                @click="selectedContact = user"
              >
                <ContactItem
                  :imageName="user.imageName"
                  :name="`${user.firstName} ${user.lastName}`"
                />
              </span>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>

        <q-tabs v-model="tab" dense class="bg-grey-3" align="justify">
          <q-tab
            name="customers"
            icon="person"
            class="text-capitalize"
            :label="$t('users')"
          ></q-tab>
          <q-tab
            name="customers"
            icon="person_add"
            class="text-capitalize"
            :label="$t('addUser')"
            @click="onAddEditUser(null, 'add')"
          ></q-tab>
        </q-tabs>
      </q-card>
    </div>
    <div class="col-lg-8 q-pl-xs col-md-8 col-sm-12 col-xs-12">
      <q-card
        class="no-border no-border"
        :style="{ height: size['height'] - 24 + 'px !important' }"
      >
        <q-toolbar class="text-black">
          <q-btn round flat class="q-pa-sm">
            <q-avatar size="80px">
              <img :src="`${pathUrl + selectedContact.imageName}`" />
            </q-avatar>
          </q-btn>
          <q-item class="q-subtitle-1 q-pl-md">
            <q-item-section>
              <q-item-label
                >{{ selectedContact.firstName }}
                {{ selectedContact.lastName }}</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-space />

          <q-btn
            round
            flat
            icon="edit"
            @click="onAddEditUser(selectedContact, 'edit')"
          >
            <q-tooltip>{{ $t('editUser') }}</q-tooltip>
          </q-btn>
        </q-toolbar>
        <q-separator></q-separator>

        <div v-for="(detail, detailIndex) in customerList" :key="detailIndex">
          <ContactDetailItem
            :icon="detail.icon"
            :textColor="detail.textColor"
            :value="selectedContact[detail['field']]"
            :label="detail.label"
            :type="detail.type"
          />

          <q-separator
            inset="item"
            v-if="detailIndex != customerList.length - 1"
          ></q-separator>
        </div>
      </q-card>
    </div>
    <AddEditUser
      :user="formData"
      :model="model"
      v-if="show_dialog"
      @onCloseDialog="closeDialog($event)"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, PropType, ref } from 'vue';
import {
  CustomerListInterface,
  SizeInterface,
} from '../../models/general-models';
import { functionsService } from '../../services/functions.service';
import { User } from '../../store/users/models';

export default defineComponent({
  components: {
    ContactDetailItem: defineAsyncComponent(
      () => import('./ContactDetailItem.vue')
    ),
    ContactItem: defineAsyncComponent(() => import('./ContactItem.vue')),
    AddEditUser: defineAsyncComponent(() => import('./AddEditUser.vue')),
  },
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true,
    },
    pathUrl: {
      type: String,
      required: true,
    },
    size: {
      type: Object as PropType<SizeInterface>,
      required: true,
    },
    customerList: {
      type: Array as PropType<CustomerListInterface[]>,
      required: true,
    },
  },
  setup(props) {
    const selectedContact = ref(props.users[0]);
    const usersList = ref(props.users);
    const search = ref('');
    const tab = ref('customers');
    const formData = ref(new User());
    const model = ref(null);
    const show_dialog = ref(false);

    const onAddEditUser = (userData: User, type: string): void => {
      if (userData) {
        formData.value = { ...userData };
      } else {
        formData.value.isActive = true;
        formData.value.imageName = process.env.defaultUserImage;
      }
      model.value = type;
      show_dialog.value = true;
    };
    const closeDialog = (userForm: User): void => {
      if (userForm?._id) {
        selectedContact.value = userForm;
        formData.value = new User();
      }
      show_dialog.value = false;
    };

    const onSearchUser = (): void => {
      usersList.value = functionsService.getUsersSearchResult(
        search.value,
        props.users
      );
    };
    return {
      tab,
      search,
      usersList,
      show_dialog,
      formData,
      model,
      onAddEditUser,
      selectedContact,
      closeDialog,
      onSearchUser,
    };
  },
});
</script>
