<template>
  <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
    <q-card class="bg-grey-4">
      <q-form @submit="onChangeUserInfo">
        <q-card-section class="text-h6">
          <div class="text-h6">{{ $t('editProfile') }}</div>
          <div class="text-subtitle2">{{ $t('completeYourProfile') }}</div>
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <q-list class="row">
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section side>
                <q-avatar size="100px">
                  <img :src="`${pathUrl + userInfo.imageName}`" />
                </q-avatar>
              </q-item-section>
              <q-item-section v-if="isDefaultImage">
                <q-btn
                  :label="$t('addPhoto')"
                  class="text-capitalize"
                  rounded
                  color="info"
                  style="max-width: 120px"
                ></q-btn>
              </q-item-section>
              <q-item-section v-else>
                <q-btn
                  :label="$t('changeImage')"
                  class="text-capitalize"
                  rounded
                  color="info"
                  style="max-width: 120px"
                ></q-btn>
                <q-btn
                  :label="$t('deleteImage')"
                  class="text-capitalize"
                  rounded
                  color="info"
                  style="max-width: 120px"
                  @click="setDefaultImage"
                ></q-btn>
              </q-item-section>
            </q-item>

            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  dense
                  lazy-rules
                  :rules="nameRules"
                  v-model="userInfo.firstName"
                  :label="$t('firstName')"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  dense
                  lazy-rules
                  :rules="nameRules"
                  v-model="userInfo.lastName"
                  :label="$t('lastName')"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  dense
                  lazy-rules
                  :rules="phoneNumberRules"
                  v-model="userInfo.phoneNumber"
                  :label="$t('phoneNumber')"
                />
              </q-item-section>
            </q-item>
            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  dense
                  lazy-rules
                  :rules="emailRules"
                  v-model="userInfo.email"
                  :label="$t('email')"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            class="text-capitalize bg-info text-white"
            type="submit"
            :label="$t('updateUserInfo')"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { AppConstants, i18n, showInfo } from '../../core/Export';
import { useStore } from '../../store';
import {
  nameRules,
  emailRules,
  phoneNumberRules,
} from '../../services/validations-fields';

export default defineComponent({
  setup() {
    const store = useStore();
    const pathUrl = process.env.BASE_API_URL + 'users/images/';
    const currentUser = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ]
    );
    const userInfo = ref({ ...currentUser.value });
    const isDefaultImage = computed(() => {
      return userInfo.value.imageName === process.env.defaultUserImage;
    });
    const onChangeUserInfo = () => {
      store
        .dispatch(
          `${AppConstants.AuthModule}/${AppConstants.Auth.ActionEditUserProfile}`,
          userInfo.value
        )
        .then(() => {
          showInfo(i18n.global.t('msgSavedSuccessfully'));
        });
    };
    const setDefaultImage = () => {
      userInfo.value.imageName = process.env.defaultUserImage;
    };
    return {
      isDefaultImage,
      pathUrl,
      nameRules,
      emailRules,
      phoneNumberRules,
      userInfo,
      onChangeUserInfo,
      setDefaultImage,
    };
  },
});
</script>
