import { AppConstants } from '../../core/Export';
import { GetterTree } from 'vuex';
import { MainStateInterface } from '..';
import { AuthStateInterface, UserAuthInterface } from './models';

const getters: GetterTree<AuthStateInterface, MainStateInterface> = {
  [AppConstants.Auth.GetAuthUser]: (state): UserAuthInterface => {
    return state.user;
  },
  [AppConstants.Auth.GetSystemRole]: (state): boolean => {
    return state.isAdminRole;
  },
};
export default getters;
