import { Module } from 'vuex';
import { MainStateInterface } from '../index';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { PurchaseStateInterface } from './models';

const purchaseModule: Module<PurchaseStateInterface, MainStateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default purchaseModule;
