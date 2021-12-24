import { UserAuthInterface, AuthStateInterface } from './models';
import { AppConstants } from 'src/core/Export';
import { MutationTree } from 'vuex';

const mutation: MutationTree<AuthStateInterface> = {
  [AppConstants.Auth.MutationAuthLoggedIn]: (
    state,
    payload: UserAuthInterface
  ) => {
    state.user = payload;
    sessionStorage.setItem('user', JSON.stringify(state.user));
  },
  [AppConstants.Auth.MutationAuthRemove]: (state) => {
    state.user = null;
    sessionStorage.removeItem('user');
  },
  [AppConstants.Auth.MutationEditUserProfile]: (
    state,
    payload: UserAuthInterface
  ) => {
    state.user.firstName = payload.firstName;
    state.user.lastName = payload.lastName;
    state.user.email = payload.email;
    state.user.phoneNumber = payload.phoneNumber;
    sessionStorage.setItem('user', JSON.stringify(state.user));
  },
  [AppConstants.Auth.MutationSetSystemRole]: (state, payload: boolean) => {
    state.isAdminRole = payload;
  },
};

export default mutation;
