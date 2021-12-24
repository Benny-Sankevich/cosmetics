import axios, { AxiosInstance } from 'axios';
import { showError } from './notification-utils';
import { Store } from 'vuex';
import { appStore, MainStateInterface } from '../store/index';
import { Loading, QSpinnerPuff } from 'quasar';
import { AppConstants, i18n } from 'src/core/Export';
import { Router } from '../router/index';

const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
});
// Spinner interceptor
httpClient.interceptors.request.use((config) => {
  if (config.baseURL && config.url) {
    (appStore as Store<MainStateInterface>).commit(
      `${AppConstants.UiModule}/${AppConstants.Ui.MutationAddPendingRequest}`,
      config.baseURL + config.url
    );
  }

  Loading.show({
    spinner: QSpinnerPuff,
    spinnerColor: 'amber',
    spinnerSize: 40,
  });
  return config;
});
// Authorization interceptor
httpClient.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization:
      'Bearer ' +
      appStore.getters[
        `${AppConstants.AuthModule}/${AppConstants.Auth.GetAuthUser}`
      ]?.token,
  };

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    (appStore as Store<MainStateInterface>).commit(
      `${AppConstants.UiModule}/${AppConstants.Ui.MutationRemovePendingRequest}`,
      `${response.config.baseURL}${response.config.url}`
    );

    const pendingRequestsCount = (appStore as Store<MainStateInterface>)
      .getters[
      `${AppConstants.UiModule}/${AppConstants.Ui.GetPendingRequestsCount}`
    ] as number;
    if (pendingRequestsCount === 0) {
      Loading.hide();
    }
    return response;
  },
  async (error) => {
    (appStore as Store<MainStateInterface>).commit(
      `${AppConstants.UiModule}/${AppConstants.Ui.MutationRemovePendingRequest}`,
      error.config.baseURL + error.config.url
    );
    const pendingRequestsCount = (await (appStore as Store<MainStateInterface>)
      .getters[
      `${AppConstants.UiModule}/${AppConstants.Ui.GetPendingRequestsCount}`
    ]) as number;
    if (pendingRequestsCount === 0) {
      Loading.hide();
    }
    if (error.response?.status === 403) {
      Router.push('/');
    }
    showError(i18n.global.t(error.response?.data));
    return Promise.reject(error);
  }
);

export { httpClient };
