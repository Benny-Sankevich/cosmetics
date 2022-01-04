<template>
  <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
    <q-card class="bg-grey-4">
      <q-form @submit="updateUserData">
        <q-card-section class="text-h6">
          <div class="text-h6">{{ $t('editProfile') }}</div>
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <q-list class="row">
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section side>
                <q-avatar size="100px">
                  <img
                    v-if="!newUserImage"
                    :src="`${pathUrl + userInfo.imageName}`"
                  />
                  <img v-if="newUserImage" :src="newUserImage" />
                </q-avatar>
              </q-item-section>
              <div v-if="isEditProfile">
                <q-item-section>
                  <q-btn
                    :label="isDefaultImage ? $t('addPhoto') : $t('changeImage')"
                    class="text-capitalize"
                    rounded
                    color="info"
                    style="max-width: 120px"
                    @click="openQFile"
                  ></q-btn>
                  <br />
                  <q-btn
                    v-if="!isDefaultImage"
                    :label="$t('deleteImage')"
                    class="text-capitalize"
                    rounded
                    color="info"
                    style="max-width: 120px"
                    @click="setDefaultImage"
                  />
                </q-item-section>
              </div>
              <q-file
                ref="blindFieldRef"
                style="display: none"
                v-model="userInfo.profileImage"
                accept=".jpg,.png"
                @input="handleImage"
              />
            </q-item>

            <q-item class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <q-item-section>
                <q-input
                  dense
                  lazy-rules
                  :rules="nameRules"
                  v-model="userInfo.firstName"
                  :label="$t('firstName')"
                  :disable="!isEditProfile"
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
                  :disable="!isEditProfile"
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
                  :disable="!isEditProfile"
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
                  :disable="!isEditProfile"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions v-if="isEditProfile" align="right">
          <q-btn
            class="text-capitalize bg-red-3 text-white"
            @click="cancelEditProfile"
            :label="$t('cancel')"
          />
          <q-btn
            class="text-capitalize bg-info text-white"
            type="submit"
            :label="$t('save')"
          />
        </q-card-actions>
        <q-card-actions v-if="!isEditProfile" align="left">
          <q-btn
            class="text-capitalize bg-red-3 text-white"
            :label="$t('updateUserInfo')"
            @click="openEditProfile"
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
    const pathUrl = ref(process.env.BASE_API_URL + 'users/images/');
    const isEditProfile = ref(false);
    const blindFieldRef = ref(null);
    const newUserImage = ref(null);
    const currentUser = computed(
      () =>
        store.getters[
          `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
        ]
    );
    let userInfo = computed(() => {
      return { ...currentUser.value };
    });

    const isDefaultImage = computed(() => {
      return userInfo.value.imageName === process.env.defaultUserImage;
    });

    const openEditProfile = () => {
      isEditProfile.value = true;
    };
    const setDefaultImage = () => {
      userInfo.value.oldImageName = userInfo.value.imageName;
      userInfo.value.imageName = process.env.defaultUserImage;
      newUserImage.value = null;
    };
    const cancelEditProfile = () => {
      isEditProfile.value = false;
      newUserImage.value = null;
      userInfo = { ...currentUser.value };
    };
    const openQFile = () => {
      if (!blindFieldRef.value) {
        return;
      }
      blindFieldRef.value.pickFiles();
    };
    const handleImage = (image): void => {
      if (image.target.files && image.target.files[0]) {
        const fileReader = new FileReader();
        fileReader.onload = (args) =>
          (newUserImage.value = args.target.result.toString());
        fileReader.readAsDataURL(image.target.files[0]);
      }
    };
    const updateUserData = () => {
      let formData = new FormData();
      formData.append('_id', userInfo.value._id);
      formData.append('firstName', userInfo.value.firstName);
      formData.append('lastName', userInfo.value.lastName);
      formData.append('email', userInfo.value.email);
      formData.append('phoneNumber', userInfo.value.phoneNumber);
      formData.append('imageName', userInfo.value.imageName);
      if (userInfo.value.oldImageName) {
        formData.append('oldImageName', userInfo.value.oldImageName);
      }
      if (userInfo.value?.profileImage) {
        formData.append('profileImage', userInfo.value.profileImage);
      }
      store
        .dispatch(
          `${AppConstants.AuthModule}/${AppConstants.Auth.ActionEditUserProfile}`,
          formData
        )
        .then(() => {
          isEditProfile.value = false;
          showInfo(i18n.global.t('msgSavedSuccessfully'));
        });
    };

    return {
      isEditProfile,
      isDefaultImage,
      pathUrl,
      nameRules,
      emailRules,
      phoneNumberRules,
      userInfo,
      newUserImage,
      blindFieldRef,
      openEditProfile,
      cancelEditProfile,
      setDefaultImage,
      updateUserData,
      openQFile,
      handleImage,
    };
  },
});
</script>
