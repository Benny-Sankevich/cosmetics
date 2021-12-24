import { Module } from 'vuex';
import { MainStateInterface } from '../index';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { AuthStateInterface } from './models';

const userModule: Module<AuthStateInterface, MainStateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default userModule;
