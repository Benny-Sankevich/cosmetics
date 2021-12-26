<template>
  <q-page class="q-pa-sm bg-white">
    <q-resize-observer @resize="onResize" />
    <div class="row" v-if="!$q.screen.lt.sm">
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
                  <q-input dense rounded outlined v-model="search">
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </q-item-label>
                <q-item-label header class="text-center"
                  >{{ users.length }} {{ $t('users') }}</q-item-label
                >
                <span
                  v-for="(user, index) in users"
                  :key="index"
                  @click="selected_contact = user"
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
                <img :src="`${pathUrl + selected_contact.imageName}`" />
              </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label
                  >{{ selected_contact.firstName }}
                  {{ selected_contact.lastName }}</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-space />

            <q-btn
              round
              flat
              icon="edit"
              @click="onAddEditUser(selected_contact, 'edit')"
            >
              <q-tooltip>{{ $t('editUser') }}</q-tooltip>
            </q-btn>
          </q-toolbar>
          <q-separator></q-separator>

          <div
            v-for="(detail, detail_index) in customer_list"
            :key="detail_index"
          >
            <contact-detail-item
              :key="detail_index"
              :icon="detail.icon"
              :text_color="detail.text_color"
              :value="selected_contact[detail['field']]"
              :label="detail.label"
              :type="detail.type"
            ></contact-detail-item>

            <q-separator
              inset="item"
              v-if="detail_index != customer_list.length - 1"
            ></q-separator>
          </div>
        </q-card>
      </div>
    </div>
    <div v-else>
      <div v-if="Object.keys(selected_contact).length == 0">
        <q-tab-panels v-model="tab" animated class="bg-white">
          <q-tab-panel
            name="customers"
            class="q-pa-none full-height"
            :style="{ height: size['height'] - 100 + 'px !important' }"
          >
            <q-list class="">
              <q-item-label class="text-center q-pa-sm">
                <q-input dense rounded outlined v-model="search">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label header class="text-center"
                >{{ users.length }} {{ $t('users') }}</q-item-label
              >

              <span
                v-for="(user, index) in users"
                :key="index"
                @click="selected_contact = user"
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
            label="Customers"
          ></q-tab>
          <q-tab
            name="customers"
            icon="person_add"
            class="text-capitalize"
            :label="$t('addUser')"
            @click="onAddEditUser(null, 'add')"
          ></q-tab>
        </q-tabs>
      </div>
      <transition v-else appear enter-active-class="animated bounceInRight">
        <q-card
          class="no-border no-border"
          :style="{ height: size['height'] - 100 + 'px !important' }"
        >
          <q-toolbar class="text-black">
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img :src="`${pathUrl + selected_contact.imageName}`" />
              </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label
                  >{{ selected_contact.firstName }}
                  {{ selected_contact.lastName }}</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-space />

            <q-btn
              round
              flat
              icon="edit"
              @click="onAddEditUser(selected_contact, 'edit')"
            >
              <q-tooltip>{{ $t('editUser') }}</q-tooltip>
            </q-btn>
            <q-btn
              round
              flat
              icon="keyboard_backspace"
              @click="selected_contact = {}"
            />
          </q-toolbar>
          <q-separator></q-separator>

          <div
            v-for="(detail, detail_index) in customer_list"
            :key="detail_index"
          >
            <ContactDetailItem
              :icon="detail.icon"
              :text_color="detail.text_color"
              :value="selected_contact[detail['field']]"
              :label="detail.label"
            />

            <q-separator
              inset="item"
              v-if="detail_index != customer_list.length - 1"
            ></q-separator>
          </div>
        </q-card>
      </transition>
    </div>
    <AddEditUser
      :user="formData"
      :model="model"
      v-if="show_dialog"
      @onCloseDialog="closeDialog($event)"
    />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue';
import { AppConstants } from '../../core/Export';
import { useStore } from '../../store';
import { UserInterface } from '../../store/users/models';
export default defineComponent({
  components: {
    AddEditUser: defineAsyncComponent(() => import('./AddEditUser.vue')),
    ContactDetailItem: defineAsyncComponent(
      () => import('./ContactDetailItem.vue')
    ),
    ContactItem: defineAsyncComponent(() => import('./ContactItem.vue')),
  },
  setup() {
    const store = useStore();
    const pathUrl = process.env.BASE_API_URL + 'users/images/';
    const size = ref({ width: '200px', height: '200px' });
    const tab = ref('customers');
    const search = ref('');
    const show_dialog = ref(false);
    const formData = ref(new UserInterface());
    const model = ref(null);
    const selected_contact = ref({});

    const customer_list = ref([
      {
        icon: 'phone',
        label: 'phoneNumber',
        field: 'phoneNumber',
        text_color: 'blue',
        type: String,
      },
      {
        icon: 'mail',
        label: 'email',
        field: 'email',
        text_color: 'grey-8',
        type: String,
      },
      {
        icon: 'schedule',
        label: 'lastLogin',
        field: 'lastLogin',
        text_color: 'grey-8',
        type: Date,
      },
      {
        icon: 'calendar_today',
        label: 'createdDate',
        field: 'createdDate',
        text_color: 'grey-8',
        type: Date,
      },
      {
        icon: 'calendar_today',
        label: 'active',
        field: 'isActive',
        text_color: 'grey-8',
        type: Boolean,
      },
      {
        icon: 'calendar_today',
        label: 'admin',
        field: 'isAdmin',
        text_color: 'grey-8',
        type: Boolean,
      },
    ]);
    const users = computed(
      () =>
        store.getters[
          `${AppConstants.UsersModule}/${AppConstants.Users.GetUsers}`
        ]
    );

    const onAddEditUser = (userData, type) => {
      if (userData) {
        formData.value = { ...userData };
      } else {
        formData.value.isActive = true;
      }
      model.value = type;
      show_dialog.value = true;
    };
    const closeDialog = (userForm) => {
      if (userForm?._id) {
        selected_contact.value = userForm;
      }
      show_dialog.value = false;
    };
    const onResize = (size_dynamic) => {
      size.value = size_dynamic;
    };
    return {
      pathUrl,
      users,
      tab,
      search,
      size,
      show_dialog,
      formData,
      model,
      selected_contact,
      customer_list,
      onResize,
      onAddEditUser,
      closeDialog,
    };
  },
  mounted() {
    if (!this.$q.screen.lt.sm) {
      this.selected_contact = this.users[0];
    }
  },
});
</script>
