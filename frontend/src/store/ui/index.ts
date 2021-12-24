import { Module } from 'vuex';
import { MainStateInterface } from '../index';
import { UIStateInterface } from './models'
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const uiModule: Module<UIStateInterface, MainStateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default uiModule;
