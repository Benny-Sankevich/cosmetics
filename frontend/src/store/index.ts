import { PurchaseStateInterface } from './purchase/models';
import { AppointmentStateInterface } from './appointments/models';
import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';
import { UIStateInterface } from './ui/models';
import { AppConstants } from 'src/core/Export';
import { AuthStateInterface } from './auth/models';
import { UsersStateInterface } from './users/models';
import { TreatmentsStateInterface } from './treatments/models';
import treatments from './treatments';
import auth from './auth';
import users from './users';
import ui from './ui';
import appointments from './appointments';
import purchase from './purchase';

export interface MainStateInterface {
  [AppConstants.UiModule]: UIStateInterface;
  [AppConstants.TreatmentModule]: TreatmentsStateInterface;
  [AppConstants.AuthModule]: AuthStateInterface;
  [AppConstants.UsersModule]: UsersStateInterface;
  [AppConstants.AppointmentModule]: AppointmentStateInterface;
  [AppConstants.PurchaseModule]: PurchaseStateInterface;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<MainStateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<MainStateInterface>> =
  Symbol('nails-vuex-key');

let appStore: any;
export default store(function (/* { ssrContext } */) {
  const Store = createStore<MainStateInterface>({
    modules: {
      [AppConstants.UiModule]: ui,
      [AppConstants.TreatmentModule]: treatments,
      [AppConstants.AuthModule]: auth,
      [AppConstants.UsersModule]: users,
      [AppConstants.AppointmentModule]: appointments,
      [AppConstants.PurchaseModule]: purchase,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });
  appStore = Store;
  return Store;
});

export { appStore };

export function useStore() {
  return vuexUseStore(storeKey);
}
