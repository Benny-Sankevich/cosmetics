import { AppConstants } from 'src/core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '..';
import { AuthStateInterface } from './models';

const getters: GetterTree<AuthStateInterface, MainStateInterface> = {
  [AppConstants.Auth.GetAuthUser]: (state) => {
    return state.user;
  },
  [AppConstants.Auth.GetSystemRole]: (state) => {
    return state.isAdminRole;
  },
};
export default getters;
