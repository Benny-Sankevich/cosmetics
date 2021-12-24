import { Module } from 'vuex';
import { MainStateInterface } from '../index';
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { AppointmentStateInterface } from './models';

const treatmentModule: Module<AppointmentStateInterface, MainStateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default treatmentModule;
