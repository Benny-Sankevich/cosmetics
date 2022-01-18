import { UserAuthInterface, AuthStateInterface } from './models';
import { AppConstants } from '../../core/Export';
import { MutationTree } from 'vuex';

const mutation: MutationTree<AuthStateInterface> = {
  [AppConstants.Auth.MutationAuthLoggedIn]: (
    state,
    payload: UserAuthInterface
  ): void => {
    state.user = payload;
    sessionStorage.setItem('user', JSON.stringify(state.user));
  },
  [AppConstants.Auth.MutationAuthRemove]: (state): void => {
    state.user = null;
    sessionStorage.removeItem('user');
  },
  [AppConstants.Auth.MutationEditUserProfile]: (
    state,
    payload: UserAuthInterface
  ): void => {
    state.user.firstName = payload.firstName;
    state.user.lastName = payload.lastName;
    state.user.email = payload.email;
    state.user.phoneNumber = payload.phoneNumber;
    state.user.imageName = payload.imageName;
    sessionStorage.setItem('user', JSON.stringify(state.user));
  },
  [AppConstants.Auth.MutationSetSystemRole]: (
    state,
    payload: boolean
  ): void => {
    state.isAdminRole = payload;
  },
};

export default mutation;
